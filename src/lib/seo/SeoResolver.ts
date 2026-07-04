import { site } from "../../data/site";
import type { SeoConfig } from "../../types/Seo";

export function resolveSeoConfig(custom: Partial<SeoConfig> = {}): SeoConfig {
  const title = custom.title ? `${custom.title} | ${site.name}` : site.name;
  
  return {
    title,
    description: custom.description || site.description,
    image: custom.image || "/profile-image.jpg",
    type: custom.type || "website",
    author: custom.author || site.author,
    published: custom.published,
    updated: custom.updated,
    canonical: custom.canonical || site.url,
    schemas: custom.schemas || ["WebSite", "Person"],
    keywords: custom.keywords || "Nikhil Bajantri, Software Engineer, Systems"
  };
}

export default resolveSeoConfig;
