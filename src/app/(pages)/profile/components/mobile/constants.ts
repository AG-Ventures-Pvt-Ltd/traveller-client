import { MoneyWavyIcon, MapPinIcon, GearIcon, ClockIcon, SuitcaseIcon } from '@phosphor-icons/react'
import React from 'react'
import type { NextRouter } from "next/router";
import { TicketIcon, BookmarkSimpleIcon } from '@phosphor-icons/react';


export interface MenuItemConfig {
  id: string
  label: string
  icon: React.ElementType
  action: (
    setIsEditModalOpen: (val: boolean) => void,
    router: NextRouter
  ) => void
}

export const MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'bookmarks',
    label: 'Bookmarked Trips',
    icon: BookmarkSimpleIcon,
    action: (_, router) => router.push('/profile/bookmarks'),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: GearIcon,
    action: (_, router) => router.push('/profile/edit'),
  },
  {
    id: 'transaction',
    label: 'Transaction History',
    icon: ClockIcon,
    action: (_, router) => router.push('/profile/transactions'),
  },
  {
    id: 'trips',
    label: 'My Trips',
    icon: SuitcaseIcon,
    action: (_, router) => router.push('/profile/mytrips'),
  },
  {
    id: 'support_tickets',
    label: 'Support Tickets',
    icon: TicketIcon,
    action: (_, router) => router.push('/profile/tickets'),
  },
]

export const STAT_ITEMS = [
  {
    id: 'savings',
    icon: MoneyWavyIcon,
    value: '₹10500',
    label: 'saved on wondrr',
    color: 'text-orange-500',
  },
  {
    id: 'trips',
    icon: MapPinIcon,
    value: '25',
    label: 'trips with wondrr',
    color: 'text-blue-500',
  },
]
