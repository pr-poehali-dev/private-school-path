import json
import os
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
            settings = {r['key']: r['value'] for r in cur.fetchall()}
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
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'success': True, 'id': new_id}, ensure_ascii=False)}

    conn.close()
    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}
