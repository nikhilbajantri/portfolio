import { getCollection, type CollectionEntry } from "astro:content";

export type Note = CollectionEntry<"notes">;

export async function getNotes(): Promise<Note[]> {
  const all = await getCollection("notes");
  return all
    .filter(item => !item.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getLatestNotes(limit: number = 5): Promise<Note[]> {
  const notes = await getNotes();
  return notes.slice(0, limit);
}

export async function getNoteBySlug(slug: string): Promise<Note | undefined> {
  const all = await getCollection("notes");
  return all.find(item => item.slug === slug || item.id === slug);
}
