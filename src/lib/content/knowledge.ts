import { getCollection, type CollectionEntry } from "astro:content";

export type KnowledgeItem = CollectionEntry<"knowledge">;

export async function getKnowledgeItems(): Promise<KnowledgeItem[]> {
  const all = await getCollection("knowledge");
  return all.sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
}

export async function getPinnedKnowledgeItems(): Promise<KnowledgeItem[]> {
  const all = await getKnowledgeItems();
  return all.filter(item => item.data.pinned);
}

export async function getKnowledgeBySlug(slug: string): Promise<KnowledgeItem | undefined> {
  const all = await getCollection("knowledge");
  return all.find(item => item.id === slug);
}
