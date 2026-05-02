import React from 'react'

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    <div className="flex items-center justify-center mb-2">{icon}</div>
    <p className="text-lg font-bold text-neutral-900">{value}</p>
    <p className="text-xs text-neutral-600 text-center">{label}</p>
  </div>
)

export default StatCard
