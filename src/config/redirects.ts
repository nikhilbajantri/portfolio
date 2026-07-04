export interface RedirectConfig {
  source: string;
  destination: string;
  status: number;
}

export const redirects: RedirectConfig[] = [
  // Future mappings can be appended here
  // { source: "/old-slug", destination: "/writing/new-slug", status: 301 }
];
