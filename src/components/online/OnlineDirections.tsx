import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Direction } from "./api";

interface Props {
  directions: Direction[];
  scrollTo: (id: string) => void;
  onPick: (title: string) => void;
}

export default function OnlineDirections({ directions, scrollTo, onPick }: Props) {
  const [open, setOpen] = useState<Direction | null>(null);

  return (
    <section id="online-directions" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 section-fade">
          <span className="inline-block grad-bg text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Направления
          </span>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Чему учим <span className="grad-text">онлайн</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Выберите направление — педагог составит программу под задачи и уровень ребёнка.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 section-fade">
          {directions.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm card-hover flex flex-col"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${d.color} flex items-center justify-center shadow-lg mb-5`}>
                <Icon name={d.icon} size={26} className="text-white" />
              </div>
              <h3 className="font-montserrat font-black text-xl text-gray-900 mb-2">{d.title}</h3>
              {d.age_groups && <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">{d.age_groups}</div>}
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{d.short_desc}</p>
              <button
                onClick={() => setOpen(d)}
                className="w-full border-2 border-violet-100 text-violet-700 font-semibold py-3 rounded-xl hover:bg-violet-50 transition-colors"
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-lg">
          {open && (
            <>
              <DialogHeader>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${open.color} flex items-center justify-center shadow-lg mb-3`}>
                  <Icon name={open.icon} size={26} className="text-white" />
                </div>
                <DialogTitle className="font-montserrat font-black text-2xl text-left">{open.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {open.age_groups && (
                  <div className="text-sm text-violet-700 font-semibold bg-violet-50 rounded-xl px-4 py-2 inline-block">
                    {open.age_groups}
                  </div>
                )}
                <p className="text-gray-600 leading-relaxed">{open.full_desc || open.short_desc}</p>
                {open.seo_text && <p className="text-gray-500 text-sm leading-relaxed">{open.seo_text}</p>}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { label: "Разовое занятие", value: open.price_single },
                    { label: "Абонемент 4 занятия", value: open.price_4 },
                    { label: "Абонемент 8 занятий", value: open.price_8 },
                    { label: "Индивидуальные условия", value: open.price_custom },
                  ]
                    .filter((p) => p.value)
                    .map((p) => (
                      <div key={p.label} className="bg-gray-50 rounded-xl p-3">
                        <div className="text-xs text-gray-400 font-semibold mb-1">{p.label}</div>
                        <div className="font-montserrat font-black text-gray-900">{p.value}</div>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() => {
                    onPick(open.title);
                    setOpen(null);
                    scrollTo("online-signup");
                  }}
                  className="w-full grad-bg text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  Записаться на это направление
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
