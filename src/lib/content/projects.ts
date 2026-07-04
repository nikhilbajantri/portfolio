import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection("projects");
  return all
    .filter(item => !item.data.draft && item.data.visibility === "public")
    .sort((a, b) => (itemOrder(b) - itemOrder(a)));
}

function itemOrder(item: Project): number {
  if (item.data.featuredOrder !== undefined) return 1000 - item.data.featuredOrder;
  return item.data.order;
}

export async function getFeaturedProjects(limit: number = 4): Promise<Project[]> {
  const all = await getCollection("projects");
  return all
    .filter(item => !item.data.draft && item.data.featured && item.data.visibility === "public")
    .sort((a, b) => {
      const orderA = a.data.featuredOrder ?? 999;
      const orderB = b.data.featuredOrder ?? 999;
      return orderA - orderB;
    })
    .slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getCollection("projects");
  return all.find(item => item.slug === slug || item.id === slug);
}
