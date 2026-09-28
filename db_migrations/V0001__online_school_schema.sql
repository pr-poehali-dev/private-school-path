CREATE TABLE IF NOT EXISTS online_directions (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  short_desc TEXT DEFAULT '',
  full_desc TEXT DEFAULT '',
  icon VARCHAR(50) DEFAULT 'BookOpen',
  color VARCHAR(100) DEFAULT 'from-violet-500 to-indigo-600',
  age_groups VARCHAR(200) DEFAULT '',
  price_single VARCHAR(50) DEFAULT '',
  price_4 VARCHAR(50) DEFAULT '',
  price_8 VARCHAR(50) DEFAULT '',
  price_custom VARCHAR(200) DEFAULT 'По договорённости',
  seo_text TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  photo TEXT DEFAULT '',
  speciality VARCHAR(300) DEFAULT '',
  education TEXT DEFAULT '',
  experience VARCHAR(200) DEFAULT '',
  directions TEXT DEFAULT '',
  formats VARCHAR(200) DEFAULT '',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_schedule (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(200) NOT NULL,
  age_group VARCHAR(100) DEFAULT '',
  grade VARCHAR(100) DEFAULT '',
  format VARCHAR(100) DEFAULT '',
  weekday VARCHAR(30) DEFAULT '',
  time_slot VARCHAR(30) DEFAULT '',
  teacher_name VARCHAR(200) DEFAULT '',
  seats_left INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_requests (
  id SERIAL PRIMARY KEY,
  parent_name VARCHAR(200) DEFAULT '',
  child_name VARCHAR(200) DEFAULT '',
  child_age VARCHAR(50) DEFAULT '',
  grade VARCHAR(50) DEFAULT '',
  subject VARCHAR(200) DEFAULT '',
  format VARCHAR(100) DEFAULT '',
  preferred_time VARCHAR(200) DEFAULT '',
  phone VARCHAR(50) DEFAULT '',
  email VARCHAR(200) DEFAULT '',
  comment TEXT DEFAULT '',
  source VARCHAR(50) DEFAULT 'form',
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_reviews (
  id SERIAL PRIMARY KEY,
  author VARCHAR(200) NOT NULL,
  role VARCHAR(200) DEFAULT '',
  text TEXT NOT NULL,
  rating INT DEFAULT 5,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_faq (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS online_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS online_news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  body TEXT DEFAULT '',
  published_at DATE DEFAULT CURRENT_DATE,
  is_published BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS online_students (
  id SERIAL PRIMARY KEY,
  login VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  child_name VARCHAR(200) DEFAULT '',
  parent_name VARCHAR(200) DEFAULT '',
  grade VARCHAR(50) DEFAULT '',
  phone VARCHAR(50) DEFAULT '',
  email VARCHAR(200) DEFAULT '',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_sessions (
  token VARCHAR(80) PRIMARY KEY,
  student_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS online_lessons (
  id SERIAL PRIMARY KEY,
  student_id INT,
  subject VARCHAR(200) DEFAULT '',
  teacher_name VARCHAR(200) DEFAULT '',
  lesson_date DATE,
  lesson_time VARCHAR(30) DEFAULT '',
  link TEXT DEFAULT '',
  status VARCHAR(30) DEFAULT 'planned',
  mark VARCHAR(30) DEFAULT '',
  teacher_note TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS online_homework (
  id SERIAL PRIMARY KEY,
  student_id INT,
  subject VARCHAR(200) DEFAULT '',
  title VARCHAR(300) DEFAULT '',
  description TEXT DEFAULT '',
  file_url TEXT DEFAULT '',
  due_date DATE,
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_materials (
  id SERIAL PRIMARY KEY,
  student_id INT,
  title VARCHAR(300) NOT NULL,
  subject VARCHAR(200) DEFAULT '',
  url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_messages (
  id SERIAL PRIMARY KEY,
  student_id INT,
  author VARCHAR(200) DEFAULT 'Педагог',
  text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS online_payments (
  id SERIAL PRIMARY KEY,
  student_id INT,
  title VARCHAR(300) DEFAULT '',
  amount VARCHAR(50) DEFAULT '',
  status VARCHAR(30) DEFAULT 'unpaid',
  pay_until DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
