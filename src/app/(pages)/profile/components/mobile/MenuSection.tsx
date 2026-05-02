import React from 'react'
import MenuItem from './MenuItem'
import { MENU_ITEMS } from './constants'

interface MenuSectionProps {
  onEditProfile: () => void
  router: any
}

const MenuSection: React.FC<MenuSectionProps> = ({ onEditProfile, router }) => {
  const handleMenuClick = (itemId: string) => {
    const item = MENU_ITEMS.find((m) => m.id === itemId)
    if (item) {
      item.action(onEditProfile, router)
    }
  }

  return (
    <div className="mt-4 divide-y divide-gray-200 flex flex-col gap-2">
      {MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          onClick={() => handleMenuClick(item.id)}
        />
      ))}
    </div>
  )
}

export default MenuSection
