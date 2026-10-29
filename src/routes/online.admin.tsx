import { createFileRoute } from "@tanstack/react-router";
import OnlineAdmin from "@/pages/OnlineAdmin";

const TITLE = "Администрирование онлайн-школы «Путь к Знаниям»";
const DESCRIPTION = "Панель администратора онлайн-школы.";

export const Route = createFileRoute("/online/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  pendingComponent: AdminPending,
  component: OnlineAdmin,
});

function AdminPending() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <p className="text-gray-400 font-golos">Администрирование онлайн-школы «Путь к Знаниям». Загружаем…</p>
    </div>
  );
}