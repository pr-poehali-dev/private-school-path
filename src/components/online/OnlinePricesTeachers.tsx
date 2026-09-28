import Icon from "@/components/ui/icon";
import type { Direction, OnlineTeacher } from "./api";

interface Props {
  directions: Direction[];
  teachers: OnlineTeacher[];
  settings: Record<string, string>;
  scrollTo: (id: string) => void;
  onPick: (title: string) => void;
}

export default function OnlinePricesTeachers({ directions, teachers, settings, scrollTo, onPick }: Props) {
  return (
    <>
      {/* ── СТОИМОСТЬ ── */}
      <section id="online-prices" className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 section-fade">
            <span className="inline-block grad-bg-3 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Стоимость
            </span>
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              Стоимость <span className="grad-text">обучения</span>
            </h2>
            {settings.price_note && <p className="text-gray-500 text-lg max-w-2xl mx-auto">{settings.price_note}</p>}
          </div>

          <div className="section-fade bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="grad-bg text-white text-left">
                    <th className="px-5 py-4 font-bold">Направление</th>
                    <th className="px-4 py-4 font-bold text-center">Разовое</th>
                    <th className="px-4 py-4 font-bold text-center">4 занятия</th>
                    <th className="px-4 py-4 font-bold text-center">8 занятий</th>
                    <th className="px-4 py-4 font-bold text-center">Индивидуально</th>
                  </tr>
                </thead>
                <tbody>
                  {directions.map((d, i) => (
                    <tr key={d.id} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-5 py-4 font-semibold text-gray-900">{d.title}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{d.price_single || "—"}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{d.price_4 || "—"}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{d.price_8 || "—"}</td>
                      <td className="px-4 py-4 text-center text-gray-500">{d.price_custom || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 text-center border-t border-gray-100">
              <button
                onClick={() => scrollTo("online-signup")}
                className="grad-bg text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
              >
                Узнать стоимость
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ПРОБНОЕ ЗАНЯТИЕ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="section-fade hero-bg noise-overlay rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-500/25 blur-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl grad-bg-2 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Icon name="Sparkles" size={30} className="text-white" />
              </div>
              <h2 className="font-montserrat font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
                {settings.trial_title || "Хотите познакомиться с педагогом и форматом занятий?"}
              </h2>
              {settings.trial_text && <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">{settings.trial_text}</p>}
              <button
                onClick={() => {
                  onPick("Пробное занятие");
                  scrollTo("online-signup");
                }}
                className="grad-bg text-white font-bold text-base px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl"
              >
                {settings.trial_button || "Записаться на пробное занятие"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ПЕДАГОГИ ── */}
      <section id="online-teachers" className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 section-fade">
            <span className="inline-block grad-bg-2 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Педагоги
            </span>
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900">
              Наши педагоги <span className="grad-text">онлайн-школы</span>
            </h2>
          </div>

          {teachers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 section-fade">
              {teachers.map((t) => (
                <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 card-hover flex flex-col">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden grad-bg flex items-center justify-center mb-5 shadow-lg">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <span className="text-white font-montserrat font-black text-2xl">
                        {t.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-montserrat font-black text-lg text-gray-900 mb-1">{t.name}</h3>
                  {t.speciality && <div className="text-sm text-violet-600 font-semibold mb-4">{t.speciality}</div>}
                  <div className="space-y-2 text-sm text-gray-500 mb-6 flex-1">
                    {t.education && <div className="flex gap-2"><Icon name="GraduationCap" size={16} className="flex-shrink-0 mt-0.5" /><span>{t.education}</span></div>}
                    {t.experience && <div className="flex gap-2"><Icon name="Clock" size={16} className="flex-shrink-0 mt-0.5" /><span>{t.experience}</span></div>}
                    {t.directions && <div className="flex gap-2"><Icon name="BookOpen" size={16} className="flex-shrink-0 mt-0.5" /><span>{t.directions}</span></div>}
                    {t.formats && <div className="flex gap-2"><Icon name="Users" size={16} className="flex-shrink-0 mt-0.5" /><span>{t.formats}</span></div>}
                  </div>
                  <button
                    onClick={() => {
                      onPick(t.directions || "");
                      scrollTo("online-signup");
                    }}
                    className="w-full grad-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Записаться к педагогу
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white rounded-3xl p-10 border border-gray-100 section-fade">
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Состав педагогов онлайн-школы формируется. Оставьте заявку — подберём специалиста под задачи ребёнка.
              </p>
              <button
                onClick={() => scrollTo("online-signup")}
                className="grad-bg text-white font-semibold px-7 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Подобрать педагога
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
