export interface NavItem {
  title: string;
  route: string;
}

export const navItems: NavItem[] = [
  { title: 'Trips', route: "/trips" },
  { title: 'About', route: "/about" },
  { title: 'Partner', route: '/partner-with-us' },
  { title: 'How We Work', route: '/how-we-work' }
]

export const authenticatedNavItems: NavItem[] = [
  { title: 'Refer & Win', route: '/referral' }
]

export const hiddenPaths: string[] = ['/auth', '/verify']