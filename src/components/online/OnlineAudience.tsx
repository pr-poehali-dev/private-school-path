import Icon from "@/components/ui/icon";

const AUDIENCE = [
  {
    title: "Дошкольники",
    icon: "Baby",
    color: "from-violet-500 to-purple-600",
    text: "Подготовка к школе, развитие речи, логопедические и развивающие занятия.",
  },
  {
    title: "1–4 класс",
    icon: "BookOpen",
    color: "from-indigo-500 to-blue-600",
    text: "Помощь в освоении школьной программы, домашние задания, русский язык, математика и английский язык.",
  },
  {
    title: "5–9 класс",
    icon: "Backpack",
    color: "from-cyan-500 to-teal-600",
    text: "Подтягивание школьных предметов, устранение пробелов, подготовка к ОГЭ.",
  },
  {
    title: "10–11 класс",
    icon: "GraduationCap",
    color: "from-fuchsia-500 to-violet-600",
    text: "Подготовка к ЕГЭ и системная работа по профильным предметам.",
  },
];

const STEPS = [
  { n: "1", title: "Оставьте заявку", text: "Родитель оставляет заявку на сайте.", icon: "FileText" },
  { n: "2", title: "Бесплатная консультация", text: "Специалист уточняет возраст ребёнка, задачи и уровень подготовки.", icon: "PhoneCall" },
  { n: "3", title: "Подбираем педагога", text: "Подбираем специалиста и удобное расписание.", icon: "UserCheck" },
  { n: "4", title: "Начинаем занятия", text: "Занятия проходят онлайн в удобное для ребёнка время.", icon: "Video" },
];

const FORMATS = [
  { title: "Индивидуально", icon: "User", color: "from-violet-500 to-indigo-600", text: "Персональная программа и всё внимание педагога одному ученику." },
  { title: "В мини-группе", icon: "Users", color: "from-cyan-500 to-blue-600", text: "Небольшое количество учеников и возможность взаимодействовать с другими детьми." },
  { title: "Групповые занятия", icon: "UsersRound", color: "from-amber-500 to-orange-600", text: "Занятия по общей образовательной программе." },
];

const ADVANTAGES = [
  { icon: "Award", text: "Опытные педагоги" },
  { icon: "Target", text: "Индивидуальный подход" },
  { icon: "Globe", text: "Занятия из любой точки мира" },
  { icon: "CalendarClock", text: "Удобное расписание" },
  { icon: "MonitorSmartphone", text: "Современные образовательные технологии" },
  { icon: "MessageSquare", text: "Регулярная обратная связь для родителей" },
  { icon: "ListChecks", text: "Индивидуальная программа обучения" },
  { icon: "Users", text: "Занятия индивидуально или в группе" },
];

interface Props {
  scrollTo: (id: string) => void;
  onPickFormat: (format: string) => void;
}

export default function OnlineAudience({ scrollTo, onPickFormat }: Props) {
  return (
    <>
      {/* ── ДЛЯ КОГО ── */}
      <section id="online-audience" className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 section-fade">
            <span className="inline-block grad-bg-2 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Для кого
            </span>
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              Кому подходит <span className="grad-text">онлайн-школа</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Онлайн-занятия подходят для детей от дошкольного возраста до старших классов.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 section-fade">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 card-hover">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg mb-5`}>
                  <Icon name={a.icon} size={26} className="text-white" />
                </div>
                <h3 className="font-montserrat font-black text-xl text-gray-900 mb-3">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КАК ПРОХОДЯТ ЗАНЯТИЯ ── */}
      <section id="online-how" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 section-fade">
            <span className="inline-block grad-bg-3 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Как всё устроено
            </span>
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900">
              Как проходят <span className="grad-text">занятия</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 section-fade">
            {STEPS.map((s) => (
              <div key={s.n} className="relative bg-gray-50 rounded-3xl p-7 border border-gray-100">
                <div className="absolute top-6 right-6 font-montserrat font-black text-5xl text-gray-200 leading-none">{s.n}</div>
                <div className="w-12 h-12 rounded-2xl grad-bg flex items-center justify-center shadow-lg mb-5">
                  <Icon name={s.icon} size={22} className="text-white" />
                </div>
                <h3 className="font-montserrat font-black text-lg text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФОРМАТЫ ── */}
      <section id="online-formats" className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 section-fade">
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              Форматы <span className="grad-text">обучения</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Выберите удобный формат — или мы поможем определиться на консультации.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 section-fade">
            {FORMATS.map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 card-hover flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg mb-5`}>
                  <Icon name={f.icon} size={26} className="text-white" />
                </div>
                <h3 className="font-montserrat font-black text-xl text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{f.text}</p>
                <button
                  onClick={() => {
                    onPickFormat(f.title);
                    scrollTo("online-signup");
                  }}
                  className="w-full border-2 border-violet-100 text-violet-700 font-semibold py-3 rounded-xl hover:bg-violet-50 transition-colors"
                >
                  Выбрать формат
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА ── */}
      <section id="online-advantages" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14 section-fade">
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900">
              Почему выбирают <span className="grad-text">онлайн-школу «Путь к Знаниям»</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 section-fade">
            {ADVANTAGES.map((a) => (
              <div key={a.text} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="w-11 h-11 rounded-xl grad-bg flex items-center justify-center flex-shrink-0 shadow">
                  <Icon name={a.icon} size={20} className="text-white" />
                </div>
                <span className="text-gray-700 font-medium text-sm leading-snug pt-2">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
