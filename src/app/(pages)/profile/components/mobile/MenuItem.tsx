import React from 'react'
import { CaretRightIcon } from '@phosphor-icons/react'


interface MenuItemProps {
  label: string
  onClick: () => void
  icon: React.ElementType
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors gap-3 bg-[#E2F4A6] rounded-xl"
  >
    <div className="flex items-center gap-3 flex-1">
      <Icon size={24} weight="bold" className="text-neutral-600" />
      <span className="text-base font-medium text-neutral-900">{label}</span>
    </div>
    <CaretRightIcon size={24} weight="bold" className="text-gray-400" />
  </button>
)

export default MenuItem
