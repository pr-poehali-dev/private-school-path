import { useState } from "react";
import Icon from "@/components/ui/icon";
import { sendRequest, FORMATS, GRADES, TIME_SLOTS, type Direction } from "./api";

interface Props {
  directions: Direction[];
  presetSubject?: string;
  presetFormat?: string;
  presetTime?: string;
  source?: string;
  compact?: boolean;
  onDone?: () => void;
}

const empty = {
  parent_name: "",
  child_name: "",
  child_age: "",
  grade: "",
  subject: "",
  format: "",
  preferred_time: "",
  phone: "",
  email: "",
  comment: "",
};

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all";
const labelCls = "block text-sm font-semibold text-gray-700 mb-2";

export default function RequestForm({ directions, presetSubject, presetFormat, presetTime, source = "form", compact, onDone }: Props) {
  const [form, setForm] = useState({
    ...empty,
    subject: presetSubject || "",
    format: presetFormat || "",
    preferred_time: presetTime || "",
  });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await sendRequest({ ...form, source });
      setSent(true);
      onDone?.();
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-20 h-20 rounded-full grad-bg flex items-center justify-center mx-auto mb-5 text-white">
          <Icon name="Check" size={38} />
        </div>
        <h3 className="font-montserrat font-black text-2xl text-gray-900 mb-3">Спасибо! Ваша заявка принята</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Специалист «Пути к Знаниям» свяжется с вами для уточнения деталей.
        </p>
        <button
          onClick={() => {
            setForm({ ...empty });
            setSent(false);
          }}
          className="mt-6 grad-bg text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className={compact ? "grid gap-5" : "grid sm:grid-cols-2 gap-5"}>
        <div>
          <label className={labelCls}>Имя родителя *</label>
          <input required value={form.parent_name} onChange={(e) => set("parent_name", e.target.value)} placeholder="Как к вам обращаться" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Имя ребёнка</label>
          <input value={form.child_name} onChange={(e) => set("child_name", e.target.value)} placeholder="Имя ученика" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Возраст ребёнка</label>
          <input value={form.child_age} onChange={(e) => set("child_age", e.target.value)} placeholder="Например, 8 лет" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Класс</label>
          <select value={form.grade} onChange={(e) => set("grade", e.target.value)} className={inputCls}>
            <option value="">Выберите класс</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Интересующий предмет</label>
          <select value={form.subject} onChange={(e) => set("subject", e.target.value)} className={inputCls}>
            <option value="">Выберите направление</option>
            {directions.map((d) => (
              <option key={d.id} value={d.title}>{d.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Желаемый формат</label>
          <select value={form.format} onChange={(e) => set("format", e.target.value)} className={inputCls}>
            <option value="">Выберите формат</option>
            {FORMATS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Удобное время</label>
          <select value={form.preferred_time} onChange={(e) => set("preferred_time", e.target.value)} className={inputCls}>
            <option value="">Выберите время</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Телефон *</label>
          <input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+7 (___) ___-__-__" className={inputCls} />
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelCls}>E-mail</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="mail@example.com" className={inputCls} />
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelCls}>Комментарий</label>
          <textarea rows={3} value={form.comment} onChange={(e) => set("comment", e.target.value)} placeholder="Расскажите о задачах и уровне подготовки ребёнка" className={inputCls} />
        </div>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>}

      <button
        type="submit"
        disabled={busy}
        className="w-full grad-bg text-white font-bold text-base py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
      >
        {busy ? "Отправляем…" : "Отправить заявку"}
      </button>
      <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
    </form>
  );
}
