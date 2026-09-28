import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { FORMATS, GRADES, TIME_SLOTS, WEEKDAYS, type Direction, type ScheduleItem } from "./api";

interface Props {
  schedule: ScheduleItem[];
  directions: Direction[];
  scrollTo: (id: string) => void;
  onPickSlot: (subject: string, format: string, time: string) => void;
}

const selectCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all";

const AGES = ["Дошкольники", "1–4 класс", "5–9 класс", "10–11 класс"];

export default function OnlineSchedule({ schedule, directions, scrollTo, onPickSlot }: Props) {
  const [f, setF] = useState({ subject: "", age: "", grade: "", format: "", weekday: "", time: "" });

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const reset = () => setF({ subject: "", age: "", grade: "", format: "", weekday: "", time: "" });

  const filtered = useMemo(
    () =>
      schedule.filter(
        (s) =>
          (!f.subject || s.subject === f.subject) &&
          (!f.age || s.age_group === f.age) &&
          (!f.grade || s.grade === f.grade) &&
          (!f.format || s.format === f.format) &&
          (!f.weekday || s.weekday === f.weekday) &&
          (!f.time || s.time_slot === f.time)
      ),
    [schedule, f]
  );

  const anyFilter = Object.values(f).some(Boolean);

  return (
    <section id="online-schedule" className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 section-fade">
          <span className="inline-block grad-bg text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Расписание
          </span>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Расписание <span className="grad-text">онлайн-занятий</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Подберите удобное время — и оставьте заявку прямо из расписания.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 section-fade">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <select value={f.subject} onChange={(e) => set("subject", e.target.value)} className={selectCls}>
              <option value="">Все предметы</option>
              {directions.map((d) => (
                <option key={d.id} value={d.title}>{d.title}</option>
              ))}
            </select>
            <select value={f.age} onChange={(e) => set("age", e.target.value)} className={selectCls}>
              <option value="">Любой возраст</option>
              {AGES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <select value={f.grade} onChange={(e) => set("grade", e.target.value)} className={selectCls}>
              <option value="">Любой класс</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <select value={f.format} onChange={(e) => set("format", e.target.value)} className={selectCls}>
              <option value="">Любой формат</option>
              {FORMATS.map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
            <select value={f.weekday} onChange={(e) => set("weekday", e.target.value)} className={selectCls}>
              <option value="">Любой день</option>
              {WEEKDAYS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            <select value={f.time} onChange={(e) => set("time", e.target.value)} className={selectCls}>
              <option value="">Любое время</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {anyFilter && (
            <button onClick={reset} className="text-sm text-violet-600 font-semibold mb-6 hover:underline">
              Сбросить фильтры
            </button>
          )}

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <div key={s.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col">
                  <div className="font-montserrat font-black text-gray-900 mb-1">{s.subject}</div>
                  <div className="text-xs text-violet-600 font-bold uppercase tracking-wider mb-3">{s.format}</div>
                  <div className="space-y-1 text-sm text-gray-500 mb-4 flex-1">
                    <div className="flex items-center gap-2"><Icon name="Calendar" size={15} />{s.weekday}</div>
                    <div className="flex items-center gap-2"><Icon name="Clock" size={15} />{s.time_slot}</div>
                    {s.teacher_name && <div className="flex items-center gap-2"><Icon name="User" size={15} />{s.teacher_name}</div>}
                    {(s.age_group || s.grade) && (
                      <div className="flex items-center gap-2"><Icon name="Users" size={15} />{[s.age_group, s.grade].filter(Boolean).join(" · ")}</div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onPickSlot(s.subject, s.format, s.time_slot);
                      scrollTo("online-signup");
                    }}
                    className="w-full grad-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Оставить заявку
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Icon name="CalendarSearch" size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-500 mb-5 max-w-md mx-auto">
                {schedule.length === 0
                  ? "Расписание формируется. Оставьте заявку — подберём удобное время индивидуально."
                  : "По выбранным параметрам занятий пока нет. Оставьте заявку — подберём удобное время."}
              </p>
              <button
                onClick={() => {
                  onPickSlot(f.subject, f.format, f.time);
                  scrollTo("online-signup");
                }}
                className="grad-bg text-white font-semibold px-7 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Подобрать время
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
