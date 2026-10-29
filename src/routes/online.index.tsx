import { createFileRoute } from "@tanstack/react-router";
import OnlineSchool from "@/pages/OnlineSchool";
import { EMPTY_PUBLIC, loadPublicData } from "@/components/online/loadPublic";

const TITLE = "Онлайн-школа «Путь к Знаниям» — занятия онлайн для детей и школьников";
const DESCRIPTION =
  "Онлайн-школа «Путь к Знаниям»: репетитор онлайн, подготовка к школе онлайн, логопед и дефектолог онлайн, подготовка к ОГЭ и ЕГЭ онлайн. Индивидуальные и групповые занятия для детей и школьников.";

export const Route = createFileRoute("/online/")({
  loader: async () => (await loadPublicData()) ?? EMPTY_PUBLIC,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: OnlineSchoolPage,
});

function OnlineSchoolPage() {
  const data = Route.useLoaderData();
  return <OnlineSchool data={data} />;
}
