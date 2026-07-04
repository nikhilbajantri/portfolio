import { getCollection, type CollectionEntry } from "astro:content";

export type LabItem = CollectionEntry<"lab">;

export async function getLabs(): Promise<LabItem[]> {
  const all = await getCollection("lab");
  return all.filter(item => !item.data.draft);
}

export async function getLabBySlug(slug: string): Promise<LabItem | undefined> {
  const all = await getCollection("lab");
  return all.find(item => item.slug === slug || item.id === slug);
}
