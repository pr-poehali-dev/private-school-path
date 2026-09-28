export const PUBLIC_URL = "https://functions.poehali.dev/d7abf193-5f51-4b15-a045-727f29d63223";
export const CABINET_URL = "https://functions.poehali.dev/8c7f4766-4504-4e49-b0b9-5dac1aaa0afe";
export const ADMIN_URL = "https://functions.poehali.dev/68310c80-c140-413e-83ac-bc0a66eebff0";

export interface Direction {
  id: number;
  slug: string;
  title: string;
  short_desc: string;
  full_desc: string;
  icon: string;
  color: string;
  age_groups: string;
  price_single: string;
  price_4: string;
  price_8: string;
  price_custom: string;
  seo_text: string;
  sort_order: number;
  is_active: boolean;
}

export interface OnlineTeacher {
  id: number;
  name: string;
  photo: string;
  speciality: string;
  education: string;
  experience: string;
  directions: string;
  formats: string;
  sort_order: number;
  is_active: boolean;
}

export interface ScheduleItem {
  id: number;
  subject: string;
  age_group: string;
  grade: string;
  format: string;
  weekday: string;
  time_slot: string;
  teacher_name: string;
  seats_left: number;
  is_active: boolean;
}

export interface Review {
  id: number;
  author: string;
  role: string;
  text: string;
  rating: number;
  is_published: boolean;
  sort_order: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

export interface NewsItem {
  id: number;
  title: string;
  body: string;
  published_at: string;
  is_published: boolean;
}

export interface PublicData {
  directions: Direction[];
  teachers: OnlineTeacher[];
  schedule: ScheduleItem[];
  reviews: Review[];
  faq: FaqItem[];
  settings: Record<string, string>;
  news: NewsItem[];
}

export interface RequestPayload {
  parent_name: string;
  child_name: string;
  child_age: string;
  grade: string;
  subject: string;
  format: string;
  preferred_time: string;
  phone: string;
  email: string;
  comment: string;
  source?: string;
}

export async function fetchPublicData(): Promise<PublicData> {
  const res = await fetch(PUBLIC_URL);
  if (!res.ok) throw new Error("Не удалось загрузить данные");
  return res.json();
}

export async function sendRequest(payload: RequestPayload) {
  const res = await fetch(PUBLIC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Не удалось отправить заявку");
  return res.json();
}

export const WEEKDAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
export const FORMATS = ["Индивидуально", "В мини-группе", "Групповые занятия"];
export const GRADES = ["Дошкольник", "1 класс", "2 класс", "3 класс", "4 класс", "5 класс", "6 класс", "7 класс", "8 класс", "9 класс", "10 класс", "11 класс"];
export const TIME_SLOTS = ["09:00–11:00", "11:00–13:00", "13:00–15:00", "15:00–17:00", "17:00–19:00", "19:00–21:00"];
