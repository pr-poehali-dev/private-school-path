import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SCHOOL_IMG = "https://cdn.poehali.dev/projects/c9fb471b-567a-4bfb-bdc0-b51d4bb4ad8e/files/af52f8de-f03f-4b37-9961-ccb096d195ab.jpg";
const CLASSROOM_IMG = "https://cdn.poehali.dev/projects/c9fb471b-567a-4bfb-bdc0-b51d4bb4ad8e/files/dcff1098-d24f-4bea-b56e-070032e35376.jpg";
const TEACHER_IMG = "https://cdn.poehali.dev/projects/c9fb471b-567a-4bfb-bdc0-b51d4bb4ad8e/files/1c300c96-29f6-41af-9667-03664bf01101.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О центре" },
  { id: "programs", label: "Программы" },
  { id: "schedule", label: "Расписание" },
  { id: "news", label: "Новости" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const PROGRAMS = [
  { icon: "Star", title: "Подготовка к школе", grades: "Дошкольники 5–7 лет", desc: "Чтение, счёт, развитие речи и мышления — плавный старт перед 1 классом.", color: "from-violet-500 to-purple-600" },
  { icon: "BookOpen", title: "Русский язык и чтение", grades: "1–4 классы", desc: "Грамотное письмо, техника чтения, пересказ и работа с текстом.", color: "from-cyan-500 to-blue-600" },
  { icon: "Calculator", title: "Математика", grades: "1–4 классы", desc: "Счёт, задачи, логика и основы геометрии в доступной форме.", color: "from-orange-500 to-pink-600" },
  { icon: "Globe", title: "Английский язык", grades: "1–4 классы", desc: "Алфавит, базовая лексика, разговорный английский с нуля.", color: "from-emerald-500 to-teal-600" },
  { icon: "Pencil", title: "Письмо и каллиграфия", grades: "1–2 классы", desc: "Красивый почерк, правильная постановка руки, прописи.", color: "from-pink-500 to-rose-600" },
  { icon: "Brain", title: "Развитие и творчество", grades: "1–4 классы", desc: "Логика, память, внимание, рисование и проектная деятельность.", color: "from-amber-500 to-orange-600" },
];

const TEACHERS = [
  { name: "Елена Михайлова", subject: "Математика", exp: "18 лет", img: TEACHER_IMG },
  { name: "Андрей Соколов", subject: "Физика", exp: "12 лет", img: CLASSROOM_IMG },
  { name: "Наталья Петрова", subject: "Русский язык", exp: "22 года", img: TEACHER_IMG },
  { name: "Дмитрий Козлов", subject: "Информатика", exp: "9 лет", img: CLASSROOM_IMG },
];

const NEWS = [
  { date: "15 мая 2026", tag: "Олимпиада", title: "Наши ученики победили в региональной олимпиаде по математике!", color: "bg-violet-100 text-violet-700" },
  { date: "10 мая 2026", tag: "Мероприятие", title: "Традиционный день науки прошёл на ура — 300 участников!", color: "bg-cyan-100 text-cyan-700" },
  { date: "2 мая 2026", tag: "Набор", title: "Открыт приём заявлений на 2026/27 учебный год для 1 класса.", color: "bg-pink-100 text-pink-700" },
  { date: "25 апреля 2026", tag: "Спорт", title: "Команда школы вышла в финал городского турнира по баскетболу.", color: "bg-amber-100 text-amber-700" },
];

const REVIEWS = [
  { name: "Анна К.", child: "мама ученика 2 класса", text: "Отличный центр! Ребёнок стал намного увереннее в математике. Педагоги внимательные, всегда на связи и объясняют понятно.", stars: 5 },
  { name: "Дмитрий П.", child: "папа ученицы 1 класса", text: "Дочка идёт на занятия с удовольствием — это главное! Спокойная атмосфера, небольшая группа, виден прогресс уже через месяц.", stars: 5 },
  { name: "Елена В.", child: "мама ученика 3 класса", text: "Очень довольны центром. Сын подтянул русский язык и стал читать намного лучше. Педагог умеет найти подход к каждому.", stars: 5 },
  { name: "Марина С.", child: "мама ученицы 4 класса", text: "Удобное расположение, приятный коллектив. Ребёнок готовится к переходу в 5 класс — уверены, что справится!", stars: 5 },
];

const SCHEDULE_DATA: Record<string, Record<string, string[]>> = {
  "1А": {
    "Пн": ["Математика — Михайлова Е.А.", "Русский язык — Петрова Н.В.", "Окружающий мир", "Физкультура", "Музыка"],
    "Вт": ["Чтение — Петрова Н.В.", "Математика — Михайлова Е.А.", "Рисование", "Труд", "Физкультура"],
    "Ср": ["Русский язык — Петрова Н.В.", "Математика — Михайлова Е.А.", "Английский", "Музыка", ""],
    "Чт": ["Математика — Михайлова Е.А.", "Чтение", "Окружающий мир", "Физкультура", "Труд"],
    "Пт": ["Русский язык — Петрова Н.В.", "Математика — Михайлова Е.А.", "Рисование", "Английский", ""],
  },
  "5Б": {
    "Пн": ["Алгебра — Михайлова Е.А.", "Физика — Соколов А.Д.", "История", "Английский", "Физкультура"],
    "Вт": ["Русский язык — Петрова Н.В.", "Геометрия — Михайлова Е.А.", "Биология", "Информатика — Козлов Д.С.", ""],
    "Ср": ["Химия", "Алгебра — Михайлова Е.А.", "Английский", "Физкультура", "ОБЖ"],
    "Чт": ["Физика — Соколов А.Д.", "Русский язык — Петрова Н.В.", "История", "Информатика — Козлов Д.С.", "Биология"],
    "Пт": ["Алгебра — Михайлова Е.А.", "Геометрия", "Английский", "Химия", ""],
  },
  "9В": {
    "Пн": ["Физика — Соколов А.Д.", "Химия", "Алгебра — Михайлова Е.А.", "Информатика — Козлов Д.С.", "Физкультура"],
    "Вт": ["Русский язык — Петрова Н.В.", "Геометрия", "Английский", "История", "Биология"],
    "Ср": ["Алгебра — Михайлова Е.А.", "Физика — Соколов А.Д.", "Обществознание", "Английский", "Физкультура"],
    "Чт": ["Химия", "Информатика — Козлов Д.С.", "Русский язык — Петрова Н.В.", "Биология", "История"],
    "Пт": ["Алгебра — Михайлова Е.А.", "Английский", "Обществознание", "Физкультура", ""],
  },
};

const TIMES = ["08:00–08:45", "09:00–09:45", "10:00–10:45", "11:00–11:45", "12:00–12:45"];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const CLASSES = ["1А", "5Б", "9В"];

const GALLERY_COLORS = [
  "from-violet-400 to-purple-600",
  "from-cyan-400 to-blue-600",
  "from-pink-400 to-rose-600",
  "from-amber-400 to-orange-600",
  "from-emerald-400 to-teal-600",
  "from-indigo-400 to-violet-600",
];

function useSectionFade() {
  useEffect(() => {
    const elements = document.querySelectorAll(".section-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1А");
  const [selectedDay, setSelectedDay] = useState("Пн");
  const [formData, setFormData] = useState({ name: "", phone: "", grade: "", comment: "" });
  const [formSent, setFormSent] = useState(false);

  useSectionFade();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-white font-golos">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-9 h-9 rounded-xl grad-bg flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🎓</span>
            </div>
            <span className="font-montserrat text-gray-900">
              <span className="grad-text font-black text-sm leading-tight block">Путь к Знаниям</span>
              <span className="text-gray-400 text-xs font-medium block leading-tight">Путилково · 1–4 классы</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-violet-600 active" : "text-gray-600 hover:text-violet-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden lg:block grad-bg text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Записаться
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-600">
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur shadow-xl border-t border-gray-100 py-4 px-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-3 text-gray-700 font-medium hover:text-violet-600 transition-colors border-b border-gray-50 last:border-0"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacts")}
              className="mt-4 w-full grad-bg text-white font-semibold py-3 rounded-xl"
            >
              Записаться в школу
            </button>
          </div>
        )}
      </nav>

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
              <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-8 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Путилково · для учеников 1–4 классов. Индивидуальный подход, опытные педагоги и уютная атмосфера — всё для успешного старта в учёбе.
              </p>
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

      {/* ── SCHEDULE ── */}
      <section id="schedule" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 section-fade">
            <span className="inline-block grad-bg-3 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Расписание</span>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
              Расписание <span className="grad-text">занятий</span>
            </h2>
            <p className="text-gray-500 text-lg">Выберите класс и день недели</p>
          </div>

          <div className="section-fade bg-gray-50 rounded-3xl p-6 lg:p-8 border border-gray-100">
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Класс</div>
                <div className="flex gap-2">
                  {CLASSES.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                        selectedClass === cls
                          ? "grad-bg text-white shadow-lg shadow-violet-200"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-violet-300"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">День недели</div>
                <div className="flex gap-2 flex-wrap">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                        selectedDay === day
                          ? "grad-bg-2 text-white shadow-lg shadow-pink-200"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {TIMES.map((time, idx) => {
                const lesson = SCHEDULE_DATA[selectedClass]?.[selectedDay]?.[idx] || "";
                const [subject, teacher] = lesson.split(" — ");
                return (
                  <div
                    key={time}
                    className={`schedule-cell flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border transition-all ${
                      lesson ? "border-gray-100 hover:border-violet-200 hover:shadow-md" : "border-dashed border-gray-200 opacity-50"
                    }`}
                  >
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="font-montserrat font-bold text-sm text-gray-400">{idx + 1} урок</div>
                      <div className="text-xs text-gray-400 mt-0.5">{time}</div>
                    </div>
                    <div className={`w-1 h-10 rounded-full flex-shrink-0 ${lesson ? "grad-bg" : "bg-gray-200"}`} />
                    <div className="flex-1">
                      {lesson ? (
                        <>
                          <div className="font-semibold text-gray-900">{subject}</div>
                          {teacher && (
                            <div className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                              <Icon name="User" size={12} />
                              {teacher}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">— Нет урока —</span>
                      )}
                    </div>
                    {lesson && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                        <Icon name="BookOpen" size={14} className="text-violet-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
              <Icon name="Info" size={14} />
              Класс {selectedClass}, {selectedDay === "Пн" ? "понедельник" : selectedDay === "Вт" ? "вторник" : selectedDay === "Ср" ? "среда" : selectedDay === "Чт" ? "четверг" : "пятница"}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 section-fade">
            <span className="inline-block grad-bg-2 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Новости</span>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
              Что <span className="grad-text-pink">нового</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {NEWS.map((news, i) => (
              <div
                key={news.title}
                className="section-fade card-hover bg-gray-50 rounded-3xl p-6 border border-gray-100 cursor-pointer"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${news.color}`}>{news.tag}</span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {news.date}
                  </span>
                </div>
                <h3 className="font-montserrat font-bold text-gray-900 text-lg leading-snug mb-3">{news.title}</h3>
                <button className="grad-text text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Читать далее <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 section-fade">
            <span className="inline-block grad-bg text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Отзывы</span>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
              Говорят <span className="grad-text">родители</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Нам доверяют семьи из Путилково и ближайших районов</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className="section-fade card-hover bg-white rounded-3xl p-7 border border-gray-100 flex flex-col gap-4"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <span key={s} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-base">«{review.text}»</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full grad-bg flex items-center justify-center text-white font-bold font-montserrat text-sm flex-shrink-0">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-gray-400 text-xs">{review.child}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 section-fade">
            <span className="inline-block grad-bg-3 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Контакты</span>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
              Запишите <span className="grad-text">ребёнка</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Оставьте заявку — свяжемся в течение одного рабочего дня</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="section-fade bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full grad-bg flex items-center justify-center mx-auto mb-5 text-white text-4xl">✓</div>
                  <h3 className="font-montserrat font-black text-2xl text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-500">Мы свяжемся с вами в течение одного рабочего дня.</p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-6 grad-bg text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <h3 className="font-montserrat font-black text-2xl text-gray-900 mb-2">Форма записи</h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Имя родителя / ребёнка *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Введите имя"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Класс / возраст ребёнка</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    >
                      <option value="">Выберите класс</option>
                      {Array.from({ length: 11 }, (_, i) => (
                        <option key={i + 1} value={`${i + 1} класс`}>{i + 1} класс</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Комментарий</label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Ваш вопрос или пожелание..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full grad-bg text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-violet-200 text-lg"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                </form>
              )}
            </div>

            <div className="section-fade space-y-4">
              {[
                { icon: "MapPin", title: "Адрес", value: "Путилковское шоссе, 4к1", sub: "Путилково, Московская область" },
                { icon: "Phone", title: "Телефон", value: "+7 (991) 743-19-91", sub: "Пн–Пт с 8:00 до 18:00" },
                { icon: "Mail", title: "Email", value: "i@panarin-top.ru", sub: "Ответим в течение дня" },
                { icon: "Clock", title: "Режим работы", value: "Пн–Пт: 7:30 – 19:00", sub: "Сб: 9:00 – 15:00 (кружки)" },
              ].map((contact) => (
                <div key={contact.title} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 card-hover">
                  <div className="w-12 h-12 grad-bg rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Icon name={contact.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{contact.title}</div>
                    <div className="font-semibold text-gray-900">{contact.value}</div>
                    <div className="text-gray-400 text-sm mt-0.5">{contact.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="hero-bg text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl grad-bg-2 flex items-center justify-center text-xl">🎓</div>
              <div>
                <div className="font-montserrat font-black text-sm leading-tight">Путь к Знаниям</div>
                <div className="text-white/50 text-xs">Путилково · 1–4 классы</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="text-sm text-white/60 hover:text-white transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
            <div className="text-white/40 text-sm">© 2026 Школа №42</div>
          </div>
        </div>
      </footer>

    </div>
  );
}