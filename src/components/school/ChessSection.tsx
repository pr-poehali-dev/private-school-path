import { useState } from "react";
import Icon from "@/components/ui/icon";

const COACH_PHOTO = "https://cdn.poehali.dev/projects/c9fb471b-567a-4bfb-bdc0-b51d4bb4ad8e/bucket/30469998-263a-4777-b0fd-0b3a7c7a7ce5.jpg";

const AWARDS = [
  {
    title: "Грамота · 1 место",
    desc: "Соревнования по быстрым шахматам г.о. Мытищи · 80-летие Победы",
    img: "https://cdn.poehali.dev/projects/c9fb471b-567a-4bfb-bdc0-b51d4bb4ad8e/bucket/6692e495-676e-488b-b4ed-aa3c12edb81c.jpg",
  },
  {
    title: "Грамота · 1 место",
    desc: "«Летний кубок Королёва» · 24.08.2025",
    img: "https://cdn.poehali.dev/projects/c9fb471b-567a-4bfb-bdc0-b51d4bb4ad8e/bucket/7bd01944-7057-47b8-9d02-5f637e87a167.jpg",
  },
  {
    title: "Диплом · 1 место",
    desc: "Чемпионат Федерации шахмат г.о. Мытищи · 9 ноября 2024",
    img: "https://cdn.poehali.dev/projects/c9fb471b-567a-4bfb-bdc0-b51d4bb4ad8e/bucket/64f6c8b5-b8c5-4c69-bd42-6f895ebe9a5f.jpg",
  },
];

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
  const [awardImg, setAwardImg] = useState<string | null>(null);

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

        {/* Карточка тренера */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-amber-100 mb-8 section-fade">
          <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
            <div className="relative mx-auto md:mx-0">
              <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-600 to-yellow-700">
                <img src={COACH_PHOTO} alt="Константин Александрович" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center shadow-lg text-3xl">
                ♟
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Тренер</div>
              <h3 className="font-montserrat font-black text-2xl text-gray-900 mb-3">Константин Александрович</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-700 text-white">КМС</span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-800">Lichess 2428</span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-800">Стаж 25+ лет</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Работаю с начинающими и шахматистами до 1 разряда. Учитываю индивидуально-психологические особенности каждого ученика. Среди воспитанников — шахматисты массовых разрядов.
              </p>
            </div>
          </div>
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

        {/* Грамоты учеников */}
        <div className="mt-12 section-fade">
          <div className="text-center mb-8">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Победы учеников</div>
            <h3 className="font-montserrat font-black text-2xl lg:text-3xl text-gray-900">
              Награды наших <span className="bg-gradient-to-r from-amber-600 to-yellow-700 bg-clip-text text-transparent">шахматистов</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {AWARDS.map((a, i) => (
              <button
                key={i}
                onClick={() => setAwardImg(a.img)}
                className="bg-white rounded-2xl p-4 shadow-lg border border-amber-100 hover:shadow-2xl hover:-translate-y-1 transition-all text-left group"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Icon name="ZoomIn" size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="font-montserrat font-black text-sm text-gray-900 mb-1 flex items-center gap-2">
                  <Icon name="Trophy" size={16} className="text-amber-600" />
                  {a.title}
                </div>
                <div className="text-gray-500 text-xs leading-relaxed">{a.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm section-fade">
          <Icon name="Award" size={16} className="inline mr-1 text-amber-600" />
          Победы в районных и городских соревнованиях гарантированы при регулярных занятиях
        </div>
      </div>

      {/* Lightbox */}
      {awardImg && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setAwardImg(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={awardImg} alt="Грамота" className="w-full rounded-2xl shadow-2xl" />
            <button
              onClick={() => setAwardImg(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Icon name="X" size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
