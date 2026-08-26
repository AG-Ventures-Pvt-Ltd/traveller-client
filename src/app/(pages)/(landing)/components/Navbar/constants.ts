export interface NavItem {
  title: string;
  route: string;
  badge?: string;
  isNew?: boolean;
}

export const navItems: NavItem[] = [
  { title: 'Home', route: "/" },
  { title: 'Explore', route: "/trips" },
  { title: 'Travel SIP', route: "/travel-sip" },
  // { title: 'Partner With Us', route: '/partner-with-us' },
]

export const authenticatedNavItems: NavItem[] = [
  // { title: 'Refer & Win', route: '/referral' }
  { title: 'Wallet', route: '/wallet' },
]

export const hiddenPaths: string[] = ['/auth', '/verify', '/welcome']