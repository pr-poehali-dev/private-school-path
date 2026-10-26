import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { fetchPublicData, type PublicData } from "@/components/online/api";
import { useSeo } from "@/components/online/useSeo";
import OnlineNav from "@/components/online/OnlineNav";
import OnlineHero from "@/components/online/OnlineHero";
import OnlineDirections from "@/components/online/OnlineDirections";
import OnlineAudience from "@/components/online/OnlineAudience";
import OnlineSchedule from "@/components/online/OnlineSchedule";
import OnlinePricesTeachers from "@/components/online/OnlinePricesTeachers";
import OnlineReviewsFaq from "@/components/online/OnlineReviewsFaq";

const EMPTY: PublicData = {
  directions: [],
  teachers: [],
  schedule: [],
  reviews: [],
  faq: [],
  settings: {},
  news: [],
};

export default function OnlineSchool() {
  const [data, setData] = useState<PublicData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [preset, setPreset] = useState({ subject: "", format: "", time: "" });

  useSeo(
    "Онлайн-школа «Путь к Знаниям» — занятия онлайн для детей и школьников",
    "Онлайн-школа «Путь к Знаниям»: репетитор онлайн, подготовка к школе онлайн, логопед и дефектолог онлайн, подготовка к ОГЭ и ЕГЭ онлайн. Индивидуальные и групповые занятия для детей и школьников."
  );

  useEffect(() => {
    fetchPublicData()
      .then(setData)
      .catch(() => setData(EMPTY))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const els = document.querySelectorAll(".section-fade");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loading]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl grad-bg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="GraduationCap" size={26} className="text-white" />
          </div>
          <p className="text-gray-400">Загружаем онлайн-школу…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-golos">
      <OnlineNav scrollTo={scrollTo} />
      <OnlineHero scrollTo={scrollTo} />

      <OnlineDirections
        directions={data.directions}
        scrollTo={scrollTo}
        onPick={(subject) => setPreset((p) => ({ ...p, subject }))}
      />

      <OnlineAudience scrollTo={scrollTo} onPickFormat={(format) => setPreset((p) => ({ ...p, format }))} />

      <OnlineSchedule
        schedule={data.schedule}
        directions={data.directions}
        scrollTo={scrollTo}
        onPickSlot={(subject, format, time) => setPreset({ subject, format, time })}
      />

      <OnlinePricesTeachers
        directions={data.directions}
        teachers={data.teachers}
        settings={data.settings}
        scrollTo={scrollTo}
        onPick={(subject) => setPreset((p) => ({ ...p, subject }))}
      />

      <OnlineReviewsFaq
        reviews={data.reviews}
        faq={data.faq}
        directions={data.directions}
        settings={data.settings}
        preset={preset}
      />

      {data.news.length > 0 && (
        <section id="online-news" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-gray-900 text-center mb-12">
              Новости <span className="grad-text">онлайн-школы</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.news.map((n) => (
                <article key={n.id} className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">
                    {new Date(n.published_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <h3 className="font-montserrat font-black text-lg text-gray-900 mb-3">{n.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{n.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO-текст */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-sm text-gray-400 leading-relaxed space-y-3">
          <div className="flex flex-wrap gap-2 mb-4">
            {data.directions.map((d) => (
              <Link key={d.id} to={`/online/${d.slug}`} className="bg-white border border-gray-200 text-gray-600 hover:text-violet-600 hover:border-violet-200 rounded-full px-3 py-1.5 text-xs font-medium transition-colors">
                {/онлайн/i.test(d.title) ? d.title : `${d.title} онлайн`}
              </Link>
            ))}
          </div>
          <h2 className="font-montserrat font-bold text-gray-500 text-base">Онлайн-школа для детей и школьников</h2>
          <p>
            Онлайн-школа «Путь к Знаниям» — это занятия онлайн для школьников и дошкольников: репетитор онлайн по
            русскому языку, математике и английскому, подготовка к школе онлайн, логопед онлайн и дефектолог онлайн,
            подготовка к ОГЭ онлайн и подготовка к ЕГЭ онлайн.
          </p>
          <p>
            Мы работаем индивидуально, в мини-группах и в группах по общей образовательной программе. Педагог составляет
            программу под возраст, класс и задачи ребёнка, а родители получают регулярную обратную связь.
          </p>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="hero-bg text-white py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl grad-bg-2 flex items-center justify-center text-xl">🎓</div>
            <div>
              <div className="font-montserrat font-black text-sm leading-tight">Онлайн-школа «Путь к Знаниям»</div>
              <div className="text-white/50 text-xs">Занятия онлайн из любой точки мира</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Основной сайт</Link>
            <Link to="/online/cabinet" className="text-white/60 hover:text-white transition-colors">Личный кабинет</Link>
            <Link to="/online/admin" className="text-white/60 hover:text-white transition-colors">Администратору</Link>
          </div>
          <div className="text-white/40 text-sm">© 2026 Путь к Знаниям</div>
        </div>
      </footer>

      {/* Мобильная кнопка записи */}
      <button
        onClick={() => scrollTo("online-signup")}
        className="lg:hidden fixed bottom-4 left-4 right-4 z-40 grad-bg text-white font-bold py-4 rounded-2xl shadow-2xl"
      >
        Записаться на занятие
      </button>
    </div>
  );
}