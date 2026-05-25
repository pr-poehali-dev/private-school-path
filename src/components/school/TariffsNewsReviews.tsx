import Icon from "@/components/ui/icon";
import { TARIFF_CATEGORIES, NEWS, REVIEWS } from "./data";

export default function TariffsNewsReviews() {
  return (
    <>
      {/* ── TARIFFS ── */}
      <section id="tariffs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 section-fade">
            <span className="inline-block grad-bg-3 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Стоимость</span>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
              Тарифы и <span className="grad-text">цены</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Пробное занятие доступно по всем направлениям. Абонементы на 4, 8 и 12 занятий.</p>
          </div>

          <div className="space-y-10">
            {TARIFF_CATEGORIES.map((cat) => (
              <div key={cat.label} className="section-fade">
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${cat.color} text-white text-sm font-bold px-4 py-2 rounded-full mb-4`}>
                  {cat.label}
                </div>
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-semibold">Направление</th>
                        <th className="text-center px-3 py-3 font-semibold">Возраст</th>
                        <th className="text-center px-3 py-3 font-semibold">Длительность</th>
                        <th className="text-center px-3 py-3 font-semibold">Пробное</th>
                        <th className="text-center px-3 py-3 font-semibold">4 занятия</th>
                        <th className="text-center px-3 py-3 font-semibold">8 занятий</th>
                        <th className="text-center px-3 py-3 font-semibold">12 занятий</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item, i) => (
                        <tr key={i} className={`border-t border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                          <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                          <td className="px-3 py-3 text-center text-gray-500">{item.age}</td>
                          <td className="px-3 py-3 text-center text-gray-500">{item.dur}</td>
                          <td className="px-3 py-3 text-center font-semibold text-violet-600">{item.trial.toLocaleString()} ₽</td>
                          <td className="px-3 py-3 text-center text-gray-700">{item.a4 ? `${item.a4.toLocaleString()} ₽` : <span className="text-gray-300">—</span>}</td>
                          <td className="px-3 py-3 text-center text-gray-700">{item.a8 ? `${item.a8.toLocaleString()} ₽` : <span className="text-gray-300">—</span>}</td>
                          <td className="px-3 py-3 text-center text-gray-700">{item.a12 ? `${item.a12.toLocaleString()} ₽` : <span className="text-gray-300">—</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-violet-50 rounded-2xl p-5 text-sm text-violet-700 flex gap-3 items-start section-fade">
            <Icon name="Info" size={18} className="flex-shrink-0 mt-0.5" />
            <span>Срок действия абонемента — <strong>5 недель</strong> с момента первого занятия. При покупке абонемента пробное занятие не требуется.</span>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-24 bg-gray-50">
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
                className="section-fade card-hover bg-white rounded-3xl p-6 border border-gray-100 cursor-pointer"
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
    </>
  );
}
