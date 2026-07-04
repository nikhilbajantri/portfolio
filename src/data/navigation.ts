export interface NavLink {
  label: string;
  url: string;
}

export const headerNav: NavLink[] = [
  { label: "Writing", url: "/writing" },
  { label: "Work", url: "/work" },
  { label: "Notes", url: "/notes" },
  { label: "Lab", url: "/lab" },
  { label: "Knowledge", url: "/knowledge" },
  { label: "Reading", url: "/reading" }
];

export const footerNav: NavLink[] = [
  { label: "About", url: "/about" },
  { label: "Uses", url: "/uses" },
  { label: "Now", url: "/now" },
  { label: "Principles", url: "/principles" },
  { label: "Resume", url: "/about/resume" },
  { label: "Changelog", url: "/releases" }
];
