import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ADMIN_URL } from "@/components/online/api";
import { ENTITIES, SETTING_FIELDS, type EntityDef } from "@/components/online/adminConfig";
import { useSeo } from "@/components/online/useSeo";

type Row = Record<string, string | number | boolean | null>;

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all";

export default function OnlineAdmin() {
  const [pwd, setPwd] = useState(() => localStorage.getItem("pkz_admin_pwd") || "");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Record<string, Row[]> & { settings?: Record<string, string> }>({});
  const [entity, setEntity] = useState<EntityDef>(ENTITIES[0]);
  const [edit, setEdit] = useState<Row | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useSeo("Администрирование онлайн-школы «Путь к Знаниям»", "Панель администратора онлайн-школы.");

  const load = async (p: string) => {
    const res = await fetch(ADMIN_URL, { headers: { "X-Admin-Password": p } });
    if (!res.ok) {
      setAuthed(false);
      setError("Неверный пароль администратора");
      localStorage.removeItem("pkz_admin_pwd");
      return;
    }
    const json = await res.json();
    setData(json);
    setSettings(json.settings || {});
    setAuthed(true);
    setError("");
    localStorage.setItem("pkz_admin_pwd", p);
  };

  useEffect(() => {
    if (pwd) load(pwd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const act = async (body: Record<string, unknown>) => {
    setBusy(true);
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": pwd },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Не удалось сохранить");
        return false;
      }
      await load(pwd);
      return true;
    } finally {
      setBusy(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen hero-bg noise-overlay flex items-center justify-center px-4">
        <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl grad-bg flex items-center justify-center mb-5 shadow-lg">
            <Icon name="Lock" size={24} className="text-white" />
          </div>
          <h1 className="font-montserrat font-black text-2xl text-gray-900 mb-2">Панель администратора</h1>
          <p className="text-gray-500 text-sm mb-6">Введите пароль, чтобы управлять онлайн-школой.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(pwd);
            }}
            className="space-y-4"
          >
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Пароль" className={inputCls} />
            {error && <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>}
            <button className="w-full grad-bg text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg">Войти</button>
          </form>
          <Link to="/online" className="block text-center text-sm text-violet-600 font-semibold mt-4 hover:underline">
            К онлайн-школе
          </Link>
        </div>
      </div>
    );
  }

  const rows = (data[entity.id] as Row[]) || [];

  return (
    <div className="min-h-screen bg-gray-50 font-golos">
      <header className="glass-light sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/online" className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl grad-bg flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-lg">🎓</span>
            </div>
            <div className="min-w-0">
              <div className="grad-text font-montserrat font-black text-sm leading-tight">Админ-панель</div>
              <div className="text-gray-400 text-xs truncate">Онлайн-школа</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSettings(true)} className="text-sm font-semibold text-gray-600 hover:text-violet-600 flex items-center gap-2 px-3 py-2">
              <Icon name="Settings" size={17} />
              <span className="hidden sm:inline">Настройки</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("pkz_admin_pwd");
                setAuthed(false);
                setPwd("");
              }}
              className="text-sm font-semibold text-gray-500 hover:text-violet-600 px-3 py-2"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
          {ENTITIES.map((e) => (
            <button
              key={e.id}
              onClick={() => setEntity(e)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                entity.id === e.id ? "grad-bg text-white shadow-lg" : "bg-white text-gray-600 border border-gray-100 hover:text-violet-600"
              }`}
            >
              <Icon name={e.icon} size={17} />
              {e.label}
              <span className="text-xs opacity-60">{((data[e.id] as Row[]) || []).length}</span>
            </button>
          ))}
        </div>

        {error && <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 mb-4">{error}</div>}

        {entity.canCreate && (
          <button
            onClick={() => setEdit({})}
            className="grad-bg text-white font-semibold px-5 py-3 rounded-xl mb-5 hover:opacity-90 transition-opacity shadow-lg inline-flex items-center gap-2"
          >
            <Icon name="Plus" size={18} />
            Добавить
          </button>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((r) => (
            <div key={String(r.id)} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="font-montserrat font-black text-gray-900 text-sm leading-snug">
                  {String(r[entity.titleField] || "—")}
                </div>
                <span className="text-xs text-gray-300 font-mono">#{String(r.id)}</span>
              </div>
              {entity.subField && <div className="text-sm text-gray-400 mb-3 line-clamp-2">{String(r[entity.subField] || "")}</div>}
              {entity.id === "requests" && (
                <div className="text-xs text-gray-500 space-y-1 mb-3">
                  {r.child_name ? <div>Ребёнок: {String(r.child_name)} {r.grade ? `· ${r.grade}` : ""}</div> : null}
                  {r.subject ? <div>Предмет: {String(r.subject)}</div> : null}
                  {r.format ? <div>Формат: {String(r.format)}</div> : null}
                  {r.preferred_time ? <div>Время: {String(r.preferred_time)}</div> : null}
                  {r.email ? <div>{String(r.email)}</div> : null}
                  {r.comment ? <div className="text-gray-400">{String(r.comment)}</div> : null}
                  <div className="text-gray-300">{String(r.created_at || "").slice(0, 16).replace("T", " ")}</div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button onClick={() => setEdit(r)} className="flex-1 border-2 border-violet-100 text-violet-700 font-semibold py-2 rounded-xl text-sm hover:bg-violet-50 transition-colors">
                  Изменить
                </button>
                {entity.canCreate && (
                  <button
                    onClick={() => act({ action: "hide", entity: entity.id, item: { id: r.id } })}
                    className="px-3 py-2 text-gray-400 hover:text-rose-600 transition-colors"
                    title="Скрыть с сайта"
                  >
                    <Icon name="EyeOff" size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 bg-white rounded-2xl p-10 border border-gray-100 text-center text-gray-400">
              Пока пусто
            </div>
          )}
        </div>
      </div>

      {/* Диалог редактирования */}
      <Dialog open={!!edit} onOpenChange={(v) => !v && setEdit(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat font-black text-left">
              {edit?.id ? "Изменить запись" : "Новая запись"} · {entity.label}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {entity.fields.map((f) => {
              const val = edit?.[f.key];
              if (f.type === "bool") {
                return (
                  <label key={f.key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={val === true || val === "true"}
                      onChange={(e) => setEdit({ ...edit, [f.key]: e.target.checked })}
                      className="w-5 h-5 accent-violet-600"
                    />
                    <span className="text-sm font-semibold text-gray-700">{f.label}</span>
                  </label>
                );
              }
              return (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea rows={3} value={String(val ?? "")} onChange={(e) => setEdit({ ...edit, [f.key]: e.target.value })} className={inputCls} />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      value={String(val ?? "").slice(0, f.type === "date" ? 10 : undefined)}
                      onChange={(e) => setEdit({ ...edit, [f.key]: e.target.value })}
                      className={inputCls}
                    />
                  )}
                </div>
              );
            })}
            <button
              disabled={busy}
              onClick={async () => {
                const ok = await act({ action: edit?.id ? "update" : "create", entity: entity.id, item: edit });
                if (ok) setEdit(null);
              }}
              className="w-full grad-bg text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
            >
              {busy ? "Сохраняем…" : "Сохранить"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Настройки */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat font-black text-left">Общие настройки</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {SETTING_FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                <input value={settings[f.key] || ""} onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })} className={inputCls} />
              </div>
            ))}
            <button
              disabled={busy}
              onClick={async () => {
                const ok = await act({ action: "settings", settings });
                if (ok) {
                  setPwd(settings.admin_password || pwd);
                  setShowSettings(false);
                }
              }}
              className="w-full grad-bg text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
            >
              {busy ? "Сохраняем…" : "Сохранить настройки"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
