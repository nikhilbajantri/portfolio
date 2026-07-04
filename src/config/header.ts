export interface HeaderLink {
  name: string;
  href: string;
  hasRss?: boolean;
}

export const headerLinks: HeaderLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Writing', href: '/writing', hasRss: true },
  { name: 'Work', href: '/work' },
  { name: 'Reading', href: '/reading' },
  { name: 'About', href: '/about' }
];
