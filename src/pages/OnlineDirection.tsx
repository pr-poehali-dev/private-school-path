import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { fetchPublicData, type PublicData } from "@/components/online/api";
import { useSeo } from "@/components/online/useSeo";
import RequestForm from "@/components/online/RequestForm";

export default function OnlineDirection() {
  const { slug } = useParams();
  const [data, setData] = useState<PublicData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPublicData().then(setData).catch(() => setData(null));
  }, [slug]);

  const d = data?.directions.find((x) => x.slug === slug);
  const key = (d?.title || "").toLowerCase().split(" ")[0];
  const teachers = (data?.teachers || []).filter((t) => key && t.directions.toLowerCase().includes(key));
  const others = (data?.directions || []).filter((x) => x.slug !== slug).slice(0, 6);

  useSeo(
    d ? `${/онлайн/i.test(d.title) ? d.title : d.title + " онлайн"} — онлайн-школа «Путь к Знаниям»` : "Онлайн-школа «Путь к Знаниям»",
    d ? (d.seo_text || d.short_desc) : "Занятия онлайн для детей и школьников"
  );

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">Загружаем…</div>
    );
  }

  if (!d) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-gray-500">Направление не найдено</p>
        <Link to="/online" className="grad-bg text-white font-semibold px-6 py-3 rounded-xl">К онлайн-школе</Link>
      </div>
    );
  }

  const h1 = /онлайн/i.test(d.title) ? d.title : `${d.title} онлайн`;

  const prices = [
    { label: "Разовое занятие", value: d.price_single },
    { label: "Абонемент 4 занятия", value: d.price_4 },
    { label: "Абонемент 8 занятий", value: d.price_8 },
    { label: "Индивидуальные условия", value: d.price_custom },
  ].filter((p) => p.value);

  return (
    <div className="min-h-screen bg-white font-golos">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/online" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-violet-600">
            <Icon name="ArrowLeft" size={18} />
            Онлайн-школа
          </Link>
          <a href="#signup" className="grad-bg text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg">Записаться</a>
        </div>
      </nav>

      <section className="hero-bg noise-overlay pt-28 pb-16 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-white/60 text-sm mb-5 flex flex-wrap gap-1">
            <Link to="/" className="hover:text-white">Главная</Link> / <Link to="/online" className="hover:text-white">Онлайн-школа</Link> / <span className="text-white/90">{d.title}</span>
          </div>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${d.color} flex items-center justify-center shadow-xl mb-6`}>
            <Icon name={d.icon} size={30} className="text-white" />
          </div>
          <h1 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">{h1}</h1>
          {d.age_groups && <div className="inline-block glass text-white/90 text-sm font-semibold px-4 py-2 rounded-full mb-5">{d.age_groups}</div>}
          <p className="text-white/80 text-lg max-w-3xl leading-relaxed">{d.short_desc}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-montserrat font-black text-2xl text-gray-900">О направлении</h2>
            <p className="text-gray-600 leading-relaxed">{d.full_desc || d.short_desc}</p>
            {d.seo_text && <p className="text-gray-500 leading-relaxed">{d.seo_text}</p>}
            <div className="grid sm:grid-cols-2 gap-3 pt-3">
              {["Занятия по видеосвязи", "Программа под ребёнка", "Обратная связь родителям", "Удобное расписание"].map((t) => (
                <div key={t} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium text-gray-700">
                  <Icon name="Check" size={18} className="text-violet-600" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 h-fit">
            <h3 className="font-montserrat font-black text-lg text-gray-900 mb-4">Стоимость</h3>
            <div className="space-y-3 mb-5">
              {prices.map((p) => (
                <div key={p.label} className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">{p.label}</span>
                  <span className="font-semibold text-gray-900 text-right">{p.value}</span>
                </div>
              ))}
            </div>
            <a href="#signup" className="block text-center grad-bg text-white font-semibold py-3 rounded-xl">Записаться</a>
          </div>
        </div>
      </section>

      {teachers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-montserrat font-black text-2xl text-gray-900 mb-8">Педагоги направления</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {teachers.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden grad-bg flex-shrink-0">
                    {t.photo && <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />}
                  </div>
                  <div>
                    <div className="font-montserrat font-black text-gray-900">{t.name}</div>
                    <div className="text-sm text-violet-600 font-semibold mb-1">{t.speciality}</div>
                    {t.experience && <div className="text-sm text-gray-500">{t.experience}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="signup" className="py-16 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-montserrat font-black text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Записаться: {d.title}</h2>
          <p className="text-gray-500 text-center mb-8">Специалист свяжется с вами и подберёт педагога и время.</p>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <RequestForm directions={data.directions} presetSubject={d.title} source={`direction:${d.slug}`} />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-montserrat font-black text-2xl text-gray-900 mb-6">Другие направления</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((o) => (
              <Link key={o.id} to={`/online/${o.slug}`} className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-3 hover:border-violet-200 transition-colors">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={o.icon} size={18} className="text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-sm">{o.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
