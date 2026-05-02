import React from 'react'
import StatCard from './StatCard'
import { STAT_ITEMS } from './constants'

const StatsSection: React.FC = () => {
  return (
    <div className="border-y border-gray-200 px-4 py-6">
      <div className="flex items-center justify-between gap-4">
        {STAT_ITEMS.map((stat, index) => (
          <React.Fragment key={stat.id}>
            <StatCard
              icon={
                <stat.icon size={32} weight="fill" className={stat.color} />
              }
              value={stat.value}
              label={stat.label}
            />
            {index < STAT_ITEMS.length - 1 && (
              <div className="w-px h-16 bg-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default StatsSection
