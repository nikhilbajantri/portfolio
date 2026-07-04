export interface CommandItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "command";
}

export const commands: CommandItem[] = [
  {
    id: "cmd-home",
    title: "Open Home",
    url: "/",
    description: "Navigate back to the main homepage",
    category: "command"
  },
  {
    id: "cmd-writing",
    title: "Open Writing",
    url: "/writing",
    description: "Browse the engineering articles and essays catalog",
    category: "command"
  },
  {
    id: "cmd-work",
    title: "Open Work",
    url: "/work",
    description: "View all detailed project and professional systems engineering case studies",
    category: "command"
  },
  {
    id: "cmd-knowledge",
    title: "Open Knowledge",
    url: "/knowledge",
    description: "Open the permanent index catalog of systems learning reference resources",
    category: "command"
  },
  {
    id: "cmd-lab",
    title: "Open Lab",
    url: "/lab",
    description: "Open the interactive systems learning experiments repository",
    category: "command"
  },
  {
    id: "cmd-about",
    title: "Open About",
    url: "/about",
    description: "Read about Nikhil's background, manual, and philosophies",
    category: "command"
  },
  {
    id: "cmd-rss",
    title: "Open RSS",
    url: "/rss.xml",
    description: "Subscribe to the XML publication RSS feed",
    category: "command"
  },
  {
    id: "cmd-github",
    title: "Open GitHub",
    url: "https://github.com/programmer-nick234/",
    description: "View external student and product code repositories on GitHub",
    category: "command"
  },
  {
    id: "cmd-linkedin",
    title: "Open LinkedIn",
    url: "https://www.linkedin.com/in/nikhil-bajantri-dev",
    description: "Connect with Nikhil professionally on LinkedIn",
    category: "command"
  },
  {
    id: "cmd-resume",
    title: "Open Resume",
    url: "/about/resume",
    description: "View the compact summary of engineering credentials",
    category: "command"
  },
  {
    id: "cmd-random",
    title: "Random Article",
    url: "/writing/why-small-systems-win", // Handled by search selection logic dynamically
    description: "Open a random essay from the writing archives",
    category: "command"
  },
  {
    id: "cmd-latest",
    title: "Latest Journal",
    url: "/writing/engineering-journal-july-2026",
    description: "Read the latest monthly engineering progress logs",
    category: "command"
  },
  {
    id: "cmd-contact",
    title: "Contact",
    url: "mailto:nikhilbajantri2604@gmail.com",
    description: "Send Nikhil an email message",
    category: "command"
  },
  {
    id: "cmd-releases",
    title: "Open Releases",
    url: "/releases",
    description: "Open the system updates and engineering changelog index",
    category: "command"
  }
];
