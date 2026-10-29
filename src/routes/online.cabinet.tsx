import { createFileRoute } from "@tanstack/react-router";
import OnlineCabinet from "@/pages/OnlineCabinet";

const TITLE = "Личный кабинет ученика — онлайн-школа «Путь к Знаниям»";
const DESCRIPTION =
  "Личный кабинет ученика онлайн-школы «Путь к Знаниям»: расписание занятий, домашние задания, материалы, оценки и оплата.";

export const Route = createFileRoute("/online/cabinet")({
  ssr: false,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  pendingComponent: CabinetPending,
  component: OnlineCabinet,
});

function CabinetPending() {
  return (
    <div className="min-h-screen hero-bg noise-overlay flex items-center justify-center px-4 py-12">
      <p className="text-white/80 font-golos">Личный кабинет ученика — онлайн-школа «Путь к Знаниям». Загружаем…</p>
    </div>
  );
}