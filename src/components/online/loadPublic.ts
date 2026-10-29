import { PUBLIC_URL, type PublicData } from "@/components/online/api";

export const EMPTY_PUBLIC: PublicData = {
  directions: [],
  teachers: [],
  schedule: [],
  reviews: [],
  faq: [],
  settings: {},
  news: [],
};

export async function loadPublicData(): Promise<PublicData | null> {
  try {
    const res = await fetch(PUBLIC_URL);
    if (!res.ok) return null;
    return (await res.json()) as PublicData;
  } catch {
    return null;
  }
}
