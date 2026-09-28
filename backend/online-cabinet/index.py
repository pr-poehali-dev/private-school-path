import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Content-Type': 'application/json',
}


def esc(v):
    return str(v or '').replace("'", "''")[:2000]


def hash_pwd(p: str) -> str:
    return hashlib.sha256(('pkz-online-' + p).encode()).hexdigest()


S = os.environ.get('MAIN_DB_SCHEMA', 'public')


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Личный кабинет ученика онлайн-школы: вход, регистрация и получение расписания, домашних заданий, материалов, оценок, сообщений и оплат."""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    conn = get_conn()
    params = event.get('queryStringParameters') or {}
    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or params.get('token') or ''

    if method == 'POST':
        data = json.loads(event.get('body') or '{}')
        action = data.get('action', 'login')

        if action == 'register':
            login = esc(data.get('login')).lower()
            pwd = data.get('password') or ''
            if len(login) < 3 or len(pwd) < 4:
                conn.close()
                return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Логин от 3 символов, пароль от 4'}, ensure_ascii=False)}
            with conn.cursor() as cur:
                cur.execute(f"SELECT id FROM {S}.online_students WHERE login = '{login}'")
                if cur.fetchone():
                    conn.close()
                    return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Такой логин уже занят'}, ensure_ascii=False)}
                cur.execute(
                    f"INSERT INTO {S}.online_students (login, password_hash, child_name, parent_name, grade, phone, email) VALUES "
                    f"('{login}', '{hash_pwd(pwd)}', '{esc(data.get('child_name'))}', '{esc(data.get('parent_name'))}', "
                    f"'{esc(data.get('grade'))}', '{esc(data.get('phone'))}', '{esc(data.get('email'))}') RETURNING id"
                )
                student_id = cur.fetchone()[0]
            conn.commit()
        elif action == 'login':
            login = esc(data.get('login')).lower()
            pwd = data.get('password') or ''
            with conn.cursor() as cur:
                cur.execute(f"SELECT id FROM {S}.online_students WHERE login = '{login}' AND password_hash = '{hash_pwd(pwd)}' AND is_active = TRUE")
                row = cur.fetchone()
            if not row:
                conn.close()
                return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный логин или пароль'}, ensure_ascii=False)}
            student_id = row[0]
        else:
            conn.close()
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Unknown action'}, ensure_ascii=False)}

        new_token = secrets.token_hex(24)
        expires = (datetime.utcnow() + timedelta(days=30)).strftime('%Y-%m-%d %H:%M:%S')
        with conn.cursor() as cur:
            cur.execute(f"INSERT INTO {S}.online_sessions (token, student_id, expires_at) VALUES ('{new_token}', {student_id}, '{expires}')")
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'token': new_token}, ensure_ascii=False)}

    if not token:
        conn.close()
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Нужен вход'}, ensure_ascii=False)}

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(f"SELECT student_id FROM {S}.online_sessions WHERE token = '{esc(token)}' AND expires_at > NOW()")
        sess = cur.fetchone()
        if not sess:
            conn.close()
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Сессия истекла'}, ensure_ascii=False)}
        sid = sess['student_id']
        cur.execute(f"SELECT id, login, child_name, parent_name, grade, phone, email FROM {S}.online_students WHERE id = {sid}")
        student = cur.fetchone()
        cur.execute(f"SELECT * FROM {S}.online_lessons WHERE student_id = {sid} ORDER BY lesson_date DESC, id DESC")
        lessons = cur.fetchall()
        cur.execute(f"SELECT * FROM {S}.online_homework WHERE student_id = {sid} ORDER BY due_date DESC NULLS LAST, id DESC")
        homework = cur.fetchall()
        cur.execute(f"SELECT * FROM {S}.online_materials WHERE student_id = {sid} OR student_id IS NULL ORDER BY id DESC")
        materials = cur.fetchall()
        cur.execute(f"SELECT * FROM {S}.online_messages WHERE student_id = {sid} ORDER BY created_at DESC")
        messages = cur.fetchall()
        cur.execute(f"SELECT * FROM {S}.online_payments WHERE student_id = {sid} ORDER BY id DESC")
        payments = cur.fetchall()
    conn.close()

    body = {
        'student': student,
        'lessons': lessons,
        'homework': homework,
        'materials': materials,
        'messages': messages,
        'payments': payments,
    }
    return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(body, ensure_ascii=False, default=str)}
