import { getCollection, type CollectionEntry } from "astro:content";

export type JourneyEntry = CollectionEntry<"journey">;

export async function getJourney(): Promise<JourneyEntry[]> {
  const all = await getCollection("journey");
  return all.sort((a, b) => b.data.year - a.data.year);
}
