import Icon from "@/components/ui/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem, Review, Direction } from "./api";
import RequestForm from "./RequestForm";

interface Props {
  reviews: Review[];
  faq: FaqItem[];
  directions: Direction[];
  settings: Record<string, string>;
  preset: { subject: string; format: string; time: string };
}

export default function OnlineReviewsFaq({ reviews, faq, directions, settings, preset }: Props) {
  return (
    <>
      {/* ── ЗАПИСЬ ── */}
      <section id="online-signup" className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 section-fade">
            <span className="inline-block grad-bg text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Запись
            </span>
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              Записаться в <span className="grad-text">онлайн-школу</span>
            </h2>
            <p className="text-gray-500 text-lg">Заполните форму — специалист свяжется с вами и уточнит детали.</p>
          </div>

          <div className="section-fade bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <RequestForm
              directions={directions}
              presetSubject={preset.subject}
              presetFormat={preset.format}
              presetTime={preset.time}
              source="online-school"
            />
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ── */}
      {reviews.length > 0 && (
        <section id="online-reviews" className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 section-fade">
              <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900">
                Отзывы <span className="grad-text">родителей и учеников</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 section-fade">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 card-hover">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: Math.max(1, Math.min(5, r.rating || 5)) }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-5">{r.text}</p>
                  <div className="font-montserrat font-black text-gray-900">{r.author}</div>
                  {r.role && <div className="text-sm text-gray-400">{r.role}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faq.length > 0 && (
        <section id="online-faq" className="py-20 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12 section-fade">
              <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900">
                Частые <span className="grad-text">вопросы</span>
              </h2>
            </div>
            <div className="section-fade">
              <Accordion type="single" collapsible className="space-y-3">
                {faq.map((q) => (
                  <AccordionItem key={q.id} value={String(q.id)} className="bg-gray-50 rounded-2xl border border-gray-100 px-5">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                      {q.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 leading-relaxed pb-5">{q.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* ── КОНТАКТЫ ── */}
      <section id="online-contacts" className="hero-bg noise-overlay py-20">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10 section-fade">
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-3">
              Онлайн-школа «Путь к Знаниям»
            </h2>
            <p className="text-white/60">Свяжитесь с нами удобным способом — ответим и поможем выбрать программу.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 section-fade mb-10">
            {[
              { icon: "Phone", label: "Телефон", value: settings.phone || "", href: `tel:${(settings.phone || "").replace(/\D/g, "")}` },
              { icon: "Mail", label: "E-mail", value: settings.email || "", href: `mailto:${settings.email || ""}` },
              { icon: "Send", label: "Telegram", value: "Написать в Telegram", href: settings.telegram || "#" },
              { icon: "Users", label: "ВКонтакте", value: "Наша группа", href: settings.vk || "#" },
            ]
              .filter((c) => c.value)
              .map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-5 text-center hover:bg-white/20 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl grad-bg flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Icon name={c.icon} size={20} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">{c.label}</div>
                  <div className="text-white font-semibold text-sm break-words">{c.value}</div>
                </a>
              ))}
          </div>

          <div className="text-center">
            <a
              href={settings.telegram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block grad-bg text-white font-bold text-base px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl"
            >
              Связаться с нами
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
