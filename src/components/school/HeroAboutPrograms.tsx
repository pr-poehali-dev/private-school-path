import Icon from "@/components/ui/icon";
import { SCHOOL_IMG, CLASSROOM_IMG, PROGRAMS, NAV_ITEMS } from "./data";

interface Props {
  scrollTo: (id: string) => void;
}

export default function HeroAboutPrograms({ scrollTo }: Props) {
  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen hero-bg overflow-hidden flex items-center noise-overlay">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm font-medium text-white/90 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Приём на 2026/27 открыт
              </div>
              <p className="text-white/60 text-sm lg:text-base font-semibold uppercase tracking-widest mb-3 animate-fade-in" style={{ animationDelay: "0.05s" }}>
                Частный педагогический центр
              </p>
              <h1 className="font-montserrat font-black text-5xl lg:text-6xl leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <span style={{ background: "linear-gradient(90deg,#A78BFA,#60A5FA,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  «Путь к<br />Знаниям»
                </span>
              </h1>
              <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-5 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Путилково · для учеников 1–4 классов. Индивидуальный подход, опытные педагоги и уютная атмосфера — всё для успешного старта в учёбе.
              </p>
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: "0.25s" }}>
                <span className="glass text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  📚 Подготовка к ОГЭ и ЕГЭ
                </span>
                <span className="glass text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  🌍 Страны СНГ
                </span>
                <span className="glass text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  🇨🇳 Китай
                </span>
              </div>
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <button
                  onClick={() => scrollTo("contacts")}
                  className="grad-bg-2 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-2xl shadow-purple-900/50"
                >
                  Записаться сейчас
                </button>
                <button
                  onClick={() => scrollTo("programs")}
                  className="glass text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/15 transition-all"
                >
                  Наши программы →
                </button>
              </div>

              <div className="flex gap-8 mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                {[
                  { num: "50", label: "учеников" },
                  { num: "2 года", label: "центру" },
                  { num: "5 лет", label: "опыт педагогов" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-montserrat font-black text-3xl text-white">{stat.num}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50 animate-float">
                <img src={SCHOOL_IMG} alt="Школа" className="w-full h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-6 glass rounded-2xl p-4 text-white shadow-xl animate-pulse-glow">
                <div className="text-2xl mb-1">🏆</div>
                <div className="font-semibold text-sm">Лучшая школа</div>
                <div className="text-white/60 text-xs">города 2025</div>
              </div>
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 text-white shadow-xl">
                <div className="text-2xl mb-1">⭐</div>
                <div className="font-semibold text-sm">Рейтинг 4.9</div>
                <div className="text-white/60 text-xs">250+ отзывов</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-fade">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={CLASSROOM_IMG} alt="Класс" className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20" />
              </div>
            </div>
            <div className="section-fade">
              <span className="inline-block grad-bg text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">О центре</span>
              <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
                Место, где рождаются <span className="grad-text">таланты</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                «Путь к Знаниям» — частный педагогический центр в Путилково, который работает уже 2 года. Сегодня у нас занимаются 50 учеников начальных классов — с 1 по 4.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Наши педагоги имеют более 5 лет опыта работы с детьми. Небольшие группы и индивидуальный подход позволяют каждому ребёнку расти в своём темпе и полюбить учёбу.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Users", text: "Небольшие группы детей" },
                  { icon: "Star", text: "Педагоги с опытом 5+ лет" },
                  { icon: "Heart", text: "Уютная атмосфера" },
                  { icon: "BookOpen", text: "Программы для 1–4 классов" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm">
                    <div className="w-9 h-9 grad-bg rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 section-fade">
            <span className="inline-block grad-bg text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Программы</span>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
              Программы для <span className="grad-text">1–4 классов</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">6 направлений — от подготовки к школе до уверенного окончания начальной ступени</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((prog, i) => (
              <div
                key={prog.title}
                className="section-fade card-hover bg-gray-50 rounded-3xl p-6 border border-gray-100 cursor-pointer group"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon name={prog.icon} size={24} className="text-white" />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-gray-900 mb-1">{prog.title}</h3>
                <p className={`bg-gradient-to-r ${prog.color} bg-clip-text text-transparent text-sm font-semibold mb-3`}>{prog.grades}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
