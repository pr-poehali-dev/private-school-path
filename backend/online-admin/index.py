import json
import os
import hashlib
import psycopg2
from psycopg2.extras import RealDictCursor

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Content-Type': 'application/json',
}

TABLES = {
    'directions': ('online_directions', ['slug', 'title', 'short_desc', 'full_desc', 'icon', 'color', 'age_groups', 'price_single', 'price_4', 'price_8', 'price_custom', 'seo_text', 'sort_order', 'is_active']),
    'teachers': ('online_teachers', ['name', 'photo', 'speciality', 'education', 'experience', 'directions', 'formats', 'sort_order', 'is_active']),
    'schedule': ('online_schedule', ['subject', 'age_group', 'grade', 'format', 'weekday', 'time_slot', 'teacher_name', 'seats_left', 'is_active']),
    'reviews': ('online_reviews', ['author', 'role', 'text', 'rating', 'is_published', 'sort_order']),
    'faq': ('online_faq', ['question', 'answer', 'sort_order', 'is_active']),
    'news': ('online_news', ['title', 'body', 'published_at', 'is_published']),
    'requests': ('online_requests', ['status']),
    'students': ('online_students', ['login', 'child_name', 'parent_name', 'grade', 'phone', 'email', 'is_active']),
    'lessons': ('online_lessons', ['student_id', 'subject', 'teacher_name', 'lesson_date', 'lesson_time', 'link', 'status', 'mark', 'teacher_note']),
    'homework': ('online_homework', ['student_id', 'subject', 'title', 'description', 'file_url', 'due_date', 'status']),
    'materials': ('online_materials', ['student_id', 'title', 'subject', 'url']),
    'messages': ('online_messages', ['student_id', 'author', 'text', 'is_read']),
    'payments': ('online_payments', ['student_id', 'title', 'amount', 'status', 'pay_until']),
}

NUMERIC = {'sort_order', 'rating', 'seats_left', 'student_id'}
BOOLS = {'is_active', 'is_published', 'is_read'}
DATES = {'published_at', 'lesson_date', 'due_date', 'pay_until'}


def esc(v):
    return str(v if v is not None else '').replace("'", "''")[:4000]


def sql_val(col, v):
    if col in NUMERIC:
        try:
            return str(int(v))
        except (TypeError, ValueError):
            return 'NULL' if col == 'student_id' else '0'
    if col in BOOLS:
        return 'TRUE' if v in (True, 'true', 1, '1') else 'FALSE'
    if col in DATES:
        return f"'{esc(v)}'" if v else 'NULL'
    return f"'{esc(v)}'"


S = os.environ.get('MAIN_DB_SCHEMA', 'public')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def check_auth(conn, password):
    with conn.cursor() as cur:
        cur.execute(f"SELECT value FROM {S}.online_settings WHERE key = 'admin_password'")
        row = cur.fetchone()
    return bool(row) and password == row[0]


def handler(event: dict, context) -> dict:
    """Админ-панель онлайн-школы: управление направлениями, педагогами, ценами, расписанием, заявками, учениками, материалами, новостями и отзывами."""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    headers = event.get('headers') or {}
    password = headers.get('X-Admin-Password') or headers.get('x-admin-password') or ''

    conn = get_conn()
    if not check_auth(conn, password):
        conn.close()
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль администратора'}, ensure_ascii=False)}

    if method == 'GET':
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            result = {}
            for key, (table, _) in TABLES.items():
                cur.execute(f"SELECT * FROM {S}.{table} ORDER BY id DESC")
                result[key] = cur.fetchall()
            cur.execute(f"SELECT key, value FROM {S}.online_settings")
            result['settings'] = {r['key']: r['value'] for r in cur.fetchall()}
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(result, ensure_ascii=False, default=str)}

    data = json.loads(event.get('body') or '{}')
    action = data.get('action')
    entity = data.get('entity')
    item = data.get('item') or {}

    if action == 'settings':
        with conn.cursor() as cur:
            for k, v in (data.get('settings') or {}).items():
                cur.execute(
                    f"INSERT INTO {S}.online_settings (key, value) VALUES ('{esc(k)}', '{esc(v)}') "
                    f"ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value"
                )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'success': True}, ensure_ascii=False)}

    if entity not in TABLES:
        conn.close()
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Unknown entity'}, ensure_ascii=False)}

    table, cols = TABLES[entity]

    if action == 'create':
        use = [c for c in cols if c in item]
        if entity == 'students':
            pwd = item.get('password') or '1234'
            use_cols = use + ['password_hash']
            vals = [sql_val(c, item.get(c)) for c in use] + ["'" + hashlib.sha256(('pkz-online-' + pwd).encode()).hexdigest() + "'"]
        else:
            use_cols = use
            vals = [sql_val(c, item.get(c)) for c in use]
        with conn.cursor() as cur:
            cur.execute(f"INSERT INTO {S}.{table} ({', '.join(use_cols)}) VALUES ({', '.join(vals)}) RETURNING id")
            new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'success': True, 'id': new_id}, ensure_ascii=False)}

    if action == 'update':
        try:
            item_id = int(item.get('id'))
        except (TypeError, ValueError):
            conn.close()
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Нет id'}, ensure_ascii=False)}
        sets = [f"{c} = {sql_val(c, item.get(c))}" for c in cols if c in item]
        if item.get('password'):
            sets.append("password_hash = '" + hashlib.sha256(('pkz-online-' + item['password']).encode()).hexdigest() + "'")
        if not sets:
            conn.close()
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Нет полей'}, ensure_ascii=False)}
        with conn.cursor() as cur:
            cur.execute(f"UPDATE {S}.{table} SET {', '.join(sets)} WHERE id = {item_id}")
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'success': True}, ensure_ascii=False)}

    if action == 'hide':
        try:
            item_id = int(item.get('id'))
        except (TypeError, ValueError):
            conn.close()
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Нет id'}, ensure_ascii=False)}
        flag = 'is_published' if entity in ('reviews', 'news') else 'is_active'
        with conn.cursor() as cur:
            cur.execute(f"UPDATE {S}.{table} SET {flag} = FALSE WHERE id = {item_id}")
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'success': True}, ensure_ascii=False)}

    conn.close()
    return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Unknown action'}, ensure_ascii=False)}
