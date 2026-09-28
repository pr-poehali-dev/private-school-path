import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Props {
  scrollTo: (id: string) => void;
}

const HIGHLIGHTS = [
  { icon: "Monitor", text: "Занятия по видеосвязи" },
  { icon: "Users", text: "Индивидуально и в группах" },
  { icon: "CalendarClock", text: "Гибкое расписание" },
];

export default function OnlineHero({ scrollTo }: Props) {
  return (
    <section id="online-home" className="relative hero-bg noise-overlay pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm font-medium text-white/90">
            <Icon name="Wifi" size={16} />
            Онлайн-направление центра «Путь к Знаниям»
          </div>

          <h1 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Онлайн-школа <br className="hidden sm:block" />
            <span className="grad-text-pink">«Путь к Знаниям»</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 font-semibold mb-4">
            Качественное образование и помощь в обучении — онлайн, из любой точки мира.
          </p>

          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-2xl leading-relaxed">
            Индивидуальные и групповые занятия с опытными педагогами в удобном онлайн-формате. Помогаем детям и
            подросткам учиться, развиваться и достигать поставленных целей.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button
              onClick={() => scrollTo("online-signup")}
              className="grad-bg text-white font-bold text-base px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl"
            >
              Записаться на занятие
            </button>
            <button
              onClick={() => scrollTo("online-signup")}
              className="glass text-white font-bold text-base px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors"
            >
              Получить консультацию
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Icon name={h.icon} size={18} />
                {h.text}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/online/cabinet"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors"
            >
              <Icon name="LogIn" size={16} />
              Личный кабинет ученика
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
