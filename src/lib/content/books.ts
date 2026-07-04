import { getCollection, type CollectionEntry } from "astro:content";

export type Book = CollectionEntry<"books">;

export async function getBooks(): Promise<Book[]> {
  return await getCollection("books");
}

export async function getRecommendedBooks(): Promise<Book[]> {
  const books = await getBooks();
  return books.filter(b => b.data.recommended);
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const all = await getCollection("books");
  return all.find(item => item.slug === slug || item.id === slug);
}
