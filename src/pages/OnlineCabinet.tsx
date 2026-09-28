import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { CABINET_URL, GRADES } from "@/components/online/api";
import { useSeo } from "@/components/online/useSeo";

interface Student {
  id: number;
  login: string;
  child_name: string;
  parent_name: string;
  grade: string;
  phone: string;
  email: string;
}

interface CabinetData {
  student: Student;
  lessons: Record<string, string>[];
  homework: Record<string, string>[];
  materials: Record<string, string>[];
  messages: Record<string, string>[];
  payments: Record<string, string>[];
}

const TABS = [
  { id: "schedule", label: "Расписание", icon: "CalendarDays" },
  { id: "homework", label: "Домашние задания", icon: "NotebookPen" },
  { id: "materials", label: "Материалы", icon: "FolderOpen" },
  { id: "marks", label: "Результаты", icon: "TrendingUp" },
  { id: "messages", label: "Сообщения", icon: "MessageSquare" },
  { id: "payments", label: "Оплата", icon: "CreditCard" },
];

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all";

export default function OnlineCabinet() {
  const [token, setToken] = useState(() => localStorage.getItem("pkz_online_token") || "");
  const [data, setData] = useState<CabinetData | null>(null);
  const [tab, setTab] = useState("schedule");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ login: "", password: "", child_name: "", parent_name: "", grade: "", phone: "", email: "" });

  useSeo("Личный кабинет ученика — онлайн-школа «Путь к Знаниям»", "Личный кабинет ученика онлайн-школы «Путь к Знаниям»: расписание занятий, домашние задания, материалы, оценки и оплата.");

  const load = async (t: string) => {
    const res = await fetch(CABINET_URL, { headers: { "X-Auth-Token": t } });
    if (!res.ok) {
      localStorage.removeItem("pkz_online_token");
      setToken("");
      setData(null);
      return;
    }
    setData(await res.json());
  };

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(CABINET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, ...form }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Ошибка входа");
        return;
      }
      localStorage.setItem("pkz_online_token", json.token);
      setToken(json.token);
    } catch {
      setError("Не удалось подключиться. Попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("pkz_online_token");
    setToken("");
    setData(null);
  };

  if (!token || !data) {
    return (
      <div className="min-h-screen hero-bg noise-overlay flex items-center justify-center px-4 py-12">
        <div className="relative z-10 w-full max-w-md">
          <Link to="/online" className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6">
            <Icon name="ArrowLeft" size={16} /> К онлайн-школе
          </Link>

          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl grad-bg flex items-center justify-center mb-5 shadow-lg">
              <Icon name="User" size={26} className="text-white" />
            </div>
            <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-2">
              {mode === "login" ? "Вход в личный кабинет" : "Регистрация ученика"}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              {mode === "login"
                ? "Введите логин и пароль, которые выдал администратор."
                : "Создайте кабинет — расписание и задания появятся после подключения педагога."}
            </p>

            <form onSubmit={submit} className="space-y-4">
              <input required placeholder="Логин" value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} className={inputCls} />
              <input required type="password" placeholder="Пароль" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputCls} />

              {mode === "register" && (
                <>
                  <input placeholder="Имя ребёнка" value={form.child_name} onChange={(e) => setForm({ ...form, child_name: e.target.value })} className={inputCls} />
                  <input placeholder="Имя родителя" value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })} className={inputCls} />
                  <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={inputCls}>
                    <option value="">Класс</option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <input placeholder="Телефон" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                  <input placeholder="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                </>
              )}

              {error && <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>}

              <button disabled={busy} className="w-full grad-bg text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60">
                {busy ? "Подождите…" : mode === "login" ? "Войти" : "Создать кабинет"}
              </button>
            </form>

            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
              className="w-full mt-4 text-sm text-violet-600 font-semibold hover:underline"
            >
              {mode === "login" ? "Нет кабинета? Зарегистрироваться" : "У меня уже есть кабинет"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { student, lessons, homework, materials, messages, payments } = data;
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-gray-50 font-golos pb-16">
      <header className="glass-light sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/online" className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl grad-bg flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-lg">🎓</span>
            </div>
            <div className="min-w-0">
              <div className="grad-text font-montserrat font-black text-sm leading-tight truncate">Личный кабинет</div>
              <div className="text-gray-400 text-xs truncate">{student.child_name || student.login}</div>
            </div>
          </Link>
          <button onClick={logout} className="text-sm font-semibold text-gray-500 hover:text-violet-600 flex items-center gap-2">
            <Icon name="LogOut" size={17} />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-1">
            Здравствуйте{student.parent_name ? `, ${student.parent_name}` : ""}!
          </h1>
          <p className="text-gray-500 text-sm">
            {student.child_name && `Ученик: ${student.child_name}`}
            {student.grade && ` · ${student.grade}`}
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                tab === t.id ? "grad-bg text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:text-violet-600"
              }`}
            >
              <Icon name={t.icon} size={17} />
              {t.label}
              {t.id === "messages" && unreadCount > 0 && (
                <span className="ml-1 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {tab === "schedule" &&
            (lessons.length ? (
              lessons.map((l) => (
                <div key={l.id} className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="font-montserrat font-black text-gray-900">{l.subject}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {l.lesson_date} {l.lesson_time && `· ${l.lesson_time}`} {l.teacher_name && `· ${l.teacher_name}`}
                    </div>
                  </div>
                  {l.link && (
                    <a href={l.link} target="_blank" rel="noopener noreferrer" className="grad-bg text-white font-semibold px-5 py-3 rounded-xl text-center hover:opacity-90 transition-opacity">
                      Войти на занятие
                    </a>
                  )}
                </div>
              ))
            ) : (
              <Empty text="Занятия появятся здесь после согласования расписания с педагогом." />
            ))}

          {tab === "homework" &&
            (homework.length ? (
              homework.map((h) => (
                <div key={h.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="font-montserrat font-black text-gray-900">{h.title || h.subject}</div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${h.status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {h.status === "done" ? "Выполнено" : "К выполнению"}
                    </span>
                  </div>
                  {h.description && <p className="text-gray-500 text-sm leading-relaxed mb-3">{h.description}</p>}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    {h.subject && <span>{h.subject}</span>}
                    {h.due_date && <span>Срок: {h.due_date}</span>}
                    {h.file_url && (
                      <a href={h.file_url} target="_blank" rel="noopener noreferrer" className="text-violet-600 font-semibold">
                        Скачать файл
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <Empty text="Домашние задания появятся после первых занятий." />
            ))}

          {tab === "materials" &&
            (materials.length ? (
              materials.map((m) => (
                <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4 hover:border-violet-200 transition-colors">
                  <div className="w-11 h-11 rounded-xl grad-bg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{m.title}</div>
                    {m.subject && <div className="text-sm text-gray-400">{m.subject}</div>}
                  </div>
                </a>
              ))
            ) : (
              <Empty text="Учебные материалы добавит педагог." />
            ))}

          {tab === "marks" &&
            (lessons.filter((l) => l.mark || l.teacher_note).length ? (
              lessons
                .filter((l) => l.mark || l.teacher_note)
                .map((l) => (
                  <div key={l.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="font-montserrat font-black text-gray-900">{l.subject}</div>
                      {l.mark && <span className="grad-bg text-white font-black text-sm px-3 py-1 rounded-xl">{l.mark}</span>}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">{l.lesson_date}</div>
                    {l.teacher_note && <p className="text-gray-600 text-sm leading-relaxed">{l.teacher_note}</p>}
                  </div>
                ))
            ) : (
              <Empty text="Результаты и комментарии педагога появятся после занятий." />
            ))}

          {tab === "messages" &&
            (messages.length ? (
              messages.map((m) => (
                <div key={m.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="font-semibold text-gray-900">{m.author}</div>
                    <div className="text-xs text-gray-400">{String(m.created_at).slice(0, 16).replace("T", " ")}</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{m.text}</p>
                </div>
              ))
            ) : (
              <Empty text="Здесь появятся сообщения от педагога." />
            ))}

          {tab === "payments" &&
            (payments.length ? (
              payments.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-gray-900">{p.title}</div>
                    {p.pay_until && <div className="text-sm text-gray-400">Оплатить до {p.pay_until}</div>}
                  </div>
                  <div className="text-right">
                    <div className="font-montserrat font-black text-gray-900">{p.amount}</div>
                    <span className={`text-xs font-bold ${p.status === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                      {p.status === "paid" ? "Оплачено" : "Ожидает оплаты"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <Empty text="Информация об оплате появится после подключения абонемента." />
            ))}
        </div>
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <Icon name="Inbox" size={24} className="text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm max-w-sm mx-auto">{text}</p>
    </div>
  );
}
