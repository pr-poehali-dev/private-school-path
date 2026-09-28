import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ITEMS = [
  { id: "online-directions", label: "Направления" },
  { id: "online-audience", label: "Для кого" },
  { id: "online-how", label: "Как проходят" },
  { id: "online-schedule", label: "Расписание" },
  { id: "online-prices", label: "Стоимость" },
  { id: "online-teachers", label: "Педагоги" },
  { id: "online-faq", label: "Вопросы" },
  { id: "online-contacts", label: "Контакты" },
];

interface Props {
  scrollTo: (id: string) => void;
}

export default function OnlineNav({ scrollTo }: Props) {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl grad-bg flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🎓</span>
          </div>
          <span className="font-montserrat">
            <span className="grad-text font-black text-sm leading-tight block">Путь к Знаниям</span>
            <span className="text-gray-400 text-xs font-medium block leading-tight">Онлайн-школа</span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-5">
          {ITEMS.map((i) => (
            <button
              key={i.id}
              onClick={() => go(i.id)}
              className="nav-link text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors"
            >
              {i.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/online/cabinet"
            className="text-sm font-semibold text-violet-700 border-2 border-violet-200 px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors"
          >
            Кабинет
          </Link>
          <button
            onClick={() => go("online-signup")}
            className="grad-bg text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Записаться
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-600">
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur shadow-xl border-t border-gray-100 py-4 px-4 max-h-[75vh] overflow-y-auto">
          <Link to="/" className="block py-3 text-gray-700 font-medium border-b border-gray-50">
            ← На главную сайта
          </Link>
          {ITEMS.map((i) => (
            <button
              key={i.id}
              onClick={() => go(i.id)}
              className="block w-full text-left py-3 text-gray-700 font-medium hover:text-violet-600 transition-colors border-b border-gray-50"
            >
              {i.label}
            </button>
          ))}
          <Link to="/online/cabinet" className="block py-3 text-violet-700 font-semibold">
            Личный кабинет ученика
          </Link>
          <button onClick={() => go("online-signup")} className="mt-3 w-full grad-bg text-white font-semibold py-4 rounded-xl">
            Записаться на занятие
          </button>
        </div>
      )}
    </nav>
  );
}
