export interface NavItem {
  title: string;
  route: string;
}

export const navItems: NavItem[] = [
  { title: 'Trips', route: "/trips" },
  { title: 'About Us', route: "/about" },
  { title: 'Partner With Us', route: '/partner-with-us' },
  { title: 'How We Work', route: '/how-we-work' }
]

export const authenticatedNavItems: NavItem[] = [
  { title: 'Refer & Win', route: '/referral' }
]

export const hiddenPaths: string[] = ['/auth', '/verify']