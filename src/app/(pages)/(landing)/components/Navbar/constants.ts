export interface NavItem {
  title: string;
  route: string;
  badge?: string;
  isNew?: boolean;
}

export const navItems: NavItem[] = [
  { title: 'Home', route: "/" },
  { title: 'Explore', route: "/trips" },
  // { title: 'Partner With Us', route: '/partner-with-us' },
  // { title: 'How We Work', route: '/how-we-work' }
]

export const authenticatedNavItems: NavItem[] = [
  // { title: 'Refer & Win', route: '/referral' }
  { title: 'Wallet', route: '/wallet' },
]

export const hiddenPaths: string[] = ['/auth', '/verify', '/welcome']