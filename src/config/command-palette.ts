export interface CommandPaletteLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

export const commandPaletteLinks: CommandPaletteLink[] = [
  {
    id: "cmd-home",
    title: "Open Home",
    url: "/",
    description: "Navigate back to the main homepage"
  },
  {
    id: "cmd-writing",
    title: "Open Writing",
    url: "/writing",
    description: "Browse the engineering articles and essays catalog"
  },
  {
    id: "cmd-work",
    title: "Open Work",
    url: "/work",
    description: "View all detailed project and professional systems engineering case studies"
  },
  {
    id: "cmd-knowledge",
    title: "Open Knowledge",
    url: "/knowledge",
    description: "Open the permanent index catalog of systems learning reference resources"
  },
  {
    id: "cmd-lab",
    title: "Open Lab",
    url: "/lab",
    description: "Open the interactive systems learning experiments repository"
  },
  {
    id: "cmd-about",
    title: "Open About",
    url: "/about",
    description: "Read about Nikhil's background, manual, and philosophies"
  },
  {
    id: "cmd-rss",
    title: "Open RSS",
    url: "/rss.xml",
    description: "Subscribe to the XML publication RSS feed"
  },
  {
    id: "cmd-github",
    title: "Open GitHub",
    url: "https://github.com/programmer-nick234/",
    description: "View external student and product code repositories on GitHub"
  },
  {
    id: "cmd-linkedin",
    title: "Open LinkedIn",
    url: "https://www.linkedin.com/in/nikhil-bajantri-dev",
    description: "Connect with Nikhil professionally on LinkedIn"
  },
  {
    id: "cmd-resume",
    title: "Open Resume",
    url: "/about/resume",
    description: "View the compact summary of engineering credentials"
  },
  {
    id: "cmd-random",
    title: "Random Article",
    url: "/writing/why-small-systems-win", // Dynamic fallback
    description: "Open a random essay from the writing archives"
  },
  {
    id: "cmd-latest",
    title: "Latest Journal",
    url: "/writing/engineering-journal-july-2026",
    description: "Read the latest monthly engineering progress logs"
  },
  {
    id: "cmd-contact",
    title: "Contact",
    url: "mailto:nikhilbajantri2604@gmail.com",
    description: "Send Nikhil an email message"
  }
];
