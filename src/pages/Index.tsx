import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "@/components/school/data";
import HeroAboutPrograms from "@/components/school/HeroAboutPrograms";
import TariffsNewsReviews from "@/components/school/TariffsNewsReviews";
import TeachersSection from "@/components/school/TeachersSection";
import ContactsFooter from "@/components/school/ContactsFooter";

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

      <HeroAboutPrograms scrollTo={scrollTo} />
      <TeachersSection />
      <TariffsNewsReviews />
      <ContactsFooter
        scrollTo={scrollTo}
        formData={formData}
        setFormData={setFormData}
        formSent={formSent}
        setFormSent={setFormSent}
        handleFormSubmit={handleFormSubmit}
      />

    </div>
  );
}