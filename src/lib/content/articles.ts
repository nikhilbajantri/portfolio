import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"writing">;

export async function getArticles(): Promise<Article[]> {
  const all = await getCollection("writing");
  // Exclude drafts and sort by date descending
  return all
    .filter(item => !item.data.draft)
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
  const articles = await getArticles();
  return articles.slice(0, limit);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter(item => item.data.featured);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await getCollection("writing");
  return all.find(item => item.slug === slug || item.id === slug);
}

export async function getRelatedArticles(article: Article, limit: number = 3): Promise<Article[]> {
  const articles = await getArticles();
  const filtered = articles.filter(item => item.id !== article.id);

  // Score relationship based on tags overlap
  const scored = filtered.map(item => {
    let score = 0;
    if (item.data.category === article.data.category) {
      score += 3;
    }
    const overlap = item.data.tags.filter(t => article.data.tags.includes(t)).length;
    score += overlap * 2;
    return { item, score };
  });

  return scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.item);
}
