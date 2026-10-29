import { createFileRoute, notFound } from "@tanstack/react-router";
import OnlineDirection from "@/pages/OnlineDirection";
import { loadPublicData } from "@/components/online/loadPublic";

export const Route = createFileRoute("/online/$slug")({
  loader: async ({ params }) => {
    const data = await loadPublicData();
    if (data && !data.directions.some((x) => x.slug === params.slug)) throw notFound();
    return { data };
  },
  head: ({ loaderData, params }) => {
    const d = loaderData?.data?.directions.find((x) => x.slug === params.slug);
    const title = d
      ? `${/онлайн/i.test(d.title) ? d.title : d.title + " онлайн"} — онлайн-школа «Путь к Знаниям»`
      : "Онлайн-школа «Путь к Знаниям»";
    const description = d ? d.seo_text || d.short_desc : "Занятия онлайн для детей и школьников";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: OnlineDirectionPage,
});

function OnlineDirectionPage() {
  const { data } = Route.useLoaderData();
  return <OnlineDirection data={data} />;
}
