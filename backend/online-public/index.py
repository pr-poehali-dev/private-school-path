import json
import os
import urllib.request
import psycopg2
from psycopg2.extras import RealDictCursor

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}


def esc(v):
    return str(v or '').replace("'", "''")[:2000]


S = os.environ.get('MAIN_DB_SCHEMA', 'public')


LABELS = [
    ('parent_name', 'Родитель'), ('child_name', 'Ребёнок'), ('child_age', 'Возраст'), ('grade', 'Класс'),
    ('subject', 'Предмет'), ('format', 'Формат'), ('preferred_time', 'Время'), ('phone', 'Телефон'),
    ('email', 'E-mail'), ('comment', 'Комментарий'),
]


def notify_telegram(data: dict, req_id: int):
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if not token or not chat_id:
        return
    lines = [f'Новая заявка в онлайн-школу #{req_id}']
    for key, label in LABELS:
        if data.get(key):
            lines.append(f'{label}: {str(data.get(key))[:500]}')
    payload = json.dumps({'chat_id': chat_id, 'text': '\n'.join(lines)}).encode()
    req = urllib.request.Request(f'https://api.telegram.org/bot{token}/sendMessage', data=payload, headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req, timeout=3)
    except Exception as e:
        print(f'telegram error: {e}')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Публичные данные онлайн-школы: направления, педагоги, расписание, отзывы, FAQ, настройки. POST — приём заявки на занятие."""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    conn = get_conn()

    if method == 'GET':
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"SELECT * FROM {S}.online_directions WHERE is_active = TRUE ORDER BY sort_order, id")
            directions = cur.fetchall()
            cur.execute(f"SELECT * FROM {S}.online_teachers WHERE is_active = TRUE ORDER BY sort_order, id")
            teachers = cur.fetchall()
            cur.execute(f"SELECT * FROM {S}.online_schedule WHERE is_active = TRUE ORDER BY id")
            schedule = cur.fetchall()
            cur.execute(f"SELECT * FROM {S}.online_reviews WHERE is_published = TRUE ORDER BY sort_order, id")
            reviews = cur.fetchall()
            cur.execute(f"SELECT * FROM {S}.online_faq WHERE is_active = TRUE ORDER BY sort_order, id")
            faq = cur.fetchall()
            cur.execute(f"SELECT key, value FROM {S}.online_settings")
            settings = {r['key']: r['value'] for r in cur.fetchall() if r['key'] != 'admin_password'}
            cur.execute(f"SELECT * FROM {S}.online_news WHERE is_published = TRUE ORDER BY published_at DESC, id DESC LIMIT 20")
            news = cur.fetchall()
        conn.close()
        body = {
            'directions': directions,
            'teachers': teachers,
            'schedule': schedule,
            'reviews': reviews,
            'faq': faq,
            'settings': settings,
            'news': news,
        }
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(body, ensure_ascii=False, default=str)}

    if method == 'POST':
        data = json.loads(event.get('body') or '{}')
        cols = ['parent_name', 'child_name', 'child_age', 'grade', 'subject', 'format', 'preferred_time', 'phone', 'email', 'comment', 'source']
        vals = ", ".join("'" + esc(data.get(c)) + "'" for c in cols)
        with conn.cursor() as cur:
            cur.execute(f"INSERT INTO {S}.online_requests ({', '.join(cols)}) VALUES ({vals}) RETURNING id")
            new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        notify_telegram(data, new_id)
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'success': True, 'id': new_id}, ensure_ascii=False)}

    conn.close()
    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}
