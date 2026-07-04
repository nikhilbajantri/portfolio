import { getCollection, type CollectionEntry } from "astro:content";

export type PageItem = CollectionEntry<"pages">;

export async function getPages(): Promise<PageItem[]> {
  return await getCollection("pages");
}

export async function getPageBySlug(slug: string): Promise<PageItem | undefined> {
  const all = await getPages();
  return all.find(item => item.id === slug || item.id === `${slug}.md`);
}
