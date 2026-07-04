export type SeoSchemaType =
  | "WebSite"
  | "Person"
  | "Article"
  | "BlogPosting"
  | "Book"
  | "BreadcrumbList"
  | "SoftwareApplication"
  | "CollectionPage"
  | "WebPage";

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  type?: string;
  author?: string;
  published?: string;
  updated?: string;
  canonical?: string;
  schemas?: SeoSchemaType[];
  keywords?: string;
}
