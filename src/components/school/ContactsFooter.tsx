import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

interface FormData {
  name: string;
  phone: string;
  grade: string;
  comment: string;
}

interface Props {
  scrollTo: (id: string) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  formSent: boolean;
  setFormSent: (v: boolean) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function ContactsFooter({ scrollTo, formData, setFormData, formSent, setFormSent, handleFormSubmit }: Props) {
  return (
    <>
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
                { icon: "Phone", title: "Телефон", value: "+7 (991) 743-19-91", sub: "Пн–Вс с 9:00 до 20:00" },
                { icon: "Mail", title: "Email", value: "i@panarin-top.ru", sub: "Ответим в течение дня" },
                { icon: "Clock", title: "Режим работы", value: "Пн–Вс: 9:00 – 20:00", sub: "Без выходных" },
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
            <div className="flex items-center gap-4">
              <a href="https://vk.ru/club238238234" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.558c0 .424-.135.677-1.254.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.408 4 7.932c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.405 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.254.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/></svg>
                ВКонтакте
              </a>
              <div className="text-white/40 text-sm">© 2026 Путь к Знаниям</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}