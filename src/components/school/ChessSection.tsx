import Icon from "@/components/ui/icon";

const SCHEDULE = [
  { day: "Вторник", short: "ВТ" },
  { day: "Четверг", short: "ЧТ" },
  { day: "Суббота", short: "СБ" },
];

const FEATURES = [
  { icon: "Clock", title: "60 минут", desc: "Длительность занятия" },
  { icon: "Calendar", title: "2 раза в неделю", desc: "Регулярные тренировки" },
  { icon: "Repeat", title: "8 занятий в месяц", desc: "Полноценный курс" },
  { icon: "Trophy", title: "До 1 разряда", desc: "От новичка до разрядника" },
];

interface Props {
  scrollTo: (id: string) => void;
}

export default function ChessSection({ scrollTo }: Props) {
  return (
    <section id="chess" className="py-24 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 section-fade">
          <span className="inline-block bg-gradient-to-r from-amber-600 to-yellow-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Шахматы ♟
          </span>
          <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
            Больше, чем <span className="bg-gradient-to-r from-amber-600 to-yellow-700 bg-clip-text text-transparent">просто игра</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Тренер Константин Александрович — КМС, рейтинг Lichess 2428, стаж более 25 лет
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 section-fade">
          {/* Расписание */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center shadow-lg">
                <Icon name="CalendarDays" size={22} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Расписание</div>
                <div className="font-montserrat font-black text-xl text-gray-900">Дни занятий</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {SCHEDULE.map((s) => (
                <div
                  key={s.short}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 text-center border border-amber-100"
                >
                  <div className="font-montserrat font-black text-2xl bg-gradient-to-r from-amber-600 to-yellow-700 bg-clip-text text-transparent">
                    {s.short}
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-1">{s.day}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-amber-600 to-yellow-700 rounded-2xl p-5 text-white">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">Время занятий</div>
                <div className="font-montserrat font-black text-2xl mt-1">10:00 — 15:00</div>
              </div>
              <Icon name="Clock" size={36} className="opacity-80" />
            </div>
          </div>

          {/* Стоимость */}
          <div className="bg-gradient-to-br from-amber-600 to-yellow-700 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 text-7xl opacity-20">♟</div>
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-2">Стоимость абонемента</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-montserrat font-black text-6xl">9 000</span>
                <span className="font-bold text-2xl opacity-90">₽</span>
              </div>
              <div className="text-white/80 text-sm mb-6">в месяц · 8 занятий по 60 минут</div>

              <div className="space-y-3 mb-6">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon} size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{f.title}</div>
                      <div className="text-xs text-white/70">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo("contacts")}
                className="w-full bg-white text-amber-700 font-bold py-4 rounded-2xl hover:bg-amber-50 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={18} />
                Записаться на шахматы
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm section-fade">
          <Icon name="Award" size={16} className="inline mr-1 text-amber-600" />
          Победы в районных и городских соревнованиях гарантированы при регулярных занятиях
        </div>
      </div>
    </section>
  );
}
