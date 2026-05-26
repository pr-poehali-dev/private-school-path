import { useState } from "react";
import Icon from "@/components/ui/icon";
import { TEACHERS } from "./data";

export default function TeachersSection() {
  const [activeTeacher, setActiveTeacher] = useState(0);
  const [diplomaImg, setDiplomaImg] = useState<string | null>(null);

  const teacher = TEACHERS[activeTeacher];

  return (
    <section id="teachers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 section-fade">
          <span className="inline-block grad-bg text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Команда</span>
          <h2 className="font-montserrat font-black text-4xl lg:text-5xl text-gray-900 mb-4">
            Наши <span className="grad-text">педагоги</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Опытные специалисты с подтверждёнными квалификациями</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 section-fade">
          {TEACHERS.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTeacher(i)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeTeacher === i
                  ? "grad-bg text-white shadow-lg shadow-violet-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.name.split(" ")[0]} {t.name.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* Teacher card */}
        <div className="section-fade grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: photo + subjects */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className={`w-56 h-56 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-offset-4 bg-gradient-to-br ${teacher.color}`} style={{ ringColor: "transparent" }}>
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br ${teacher.color} flex items-center justify-center shadow-lg`}>
                <Icon name="GraduationCap" size={22} className="text-white" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-montserrat font-black text-xl text-gray-900 mb-1">{teacher.name}</h3>
            </div>

            <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Направления</div>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((s) => (
                  <span key={s} className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${teacher.color} text-white`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: facts + diplomas */}
          <div className="flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">О педагоге</div>
              <ul className="space-y-3">
                {teacher.facts.map((fact, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                    <span className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-gradient-to-br ${teacher.color} flex items-center justify-center`}>
                      <Icon name="Check" size={10} className="text-white" />
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {teacher.diplomas.length > 0 && (
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Дипломы и сертификаты</div>
                <div className="flex flex-col gap-3">
                  {teacher.diplomas.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setDiplomaImg(d.img)}
                      className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all text-left group"
                    >
                      <div className="w-14 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-gray-200">
                        <img src={d.img} alt={d.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm">{d.title}</div>
                        <div className="text-gray-400 text-xs mt-0.5 leading-relaxed">{d.desc}</div>
                      </div>
                      <Icon name="ZoomIn" size={16} className="text-gray-400 group-hover:text-violet-500 flex-shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Diploma lightbox */}
      {diplomaImg && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setDiplomaImg(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={diplomaImg} alt="Диплом" className="w-full rounded-2xl shadow-2xl" />
            <button
              onClick={() => setDiplomaImg(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Icon name="X" size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
