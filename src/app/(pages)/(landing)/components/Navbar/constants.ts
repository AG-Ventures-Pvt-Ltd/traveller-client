export interface NavItem {
  title: string;
  route: string;
  badge?: string;
  isNew?: boolean;
}

export const navItems: NavItem[] = [
  { title: 'Home', route: "/" },
  { title: 'Explore', route: "/trips" },
  { title: 'Travel Pass', route: "/travel-pass" },
  { title: 'Contact', route: "/contact" },
  // { title: 'Partner With Us', route: '/partner-with-us' },
]

export const authenticatedNavItems: NavItem[] = [
  // { title: 'Refer & Win', route: '/referral' }
  { title: 'Wallet', route: '/wallet' },
]

export const hiddenPaths: string[] = ['/auth', '/verify', '/welcome']