import { MoneyWavyIcon, MapPinIcon, GearIcon, ClockIcon, SuitcaseIcon } from '@phosphor-icons/react'
import React from 'react'
import type { NextRouter } from "next/router";



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
    id: 'rewards',
    label: 'wondrr Rewards',
    icon: MoneyWavyIcon,
    action: (_, router) => router.push('/profile?tab=1'),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: GearIcon,
    action: (setIsEditModalOpen) => setIsEditModalOpen(true),
  },
  {
    id: 'transaction',
    label: 'Transaction History',
    icon: ClockIcon,
    action: (_, router) => router.push('/profile?tab=1'),
  },
  {
    id: 'trips',
    label: 'My Trips',
    icon: SuitcaseIcon,
    action: (_, router) => router.push('/profile/mytrips'),
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
