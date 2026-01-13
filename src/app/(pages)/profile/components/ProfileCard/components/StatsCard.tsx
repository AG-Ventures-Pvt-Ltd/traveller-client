interface StatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  sublabel?: string;
}

export function StatsCard({ icon, value, label, sublabel }: StatsCardProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 p-7 flex flex-col gap-3 flex-1 min-w-[280px]">
      <div className="flex justify-between items-center">
        <div className="w-12 h-12 bg-neutral-900 rounded-xl flex justify-center items-center">
          {icon}
        </div>
        <div className="text-right">
          <div className="text-neutral-900 text-4xl font-bold font-['Satoshi'] leading-10">
            {value}
          </div>
          {sublabel && (
            <div className="text-neutral-700 text-xs font-medium font-['Satoshi'] leading-5">
              {sublabel}
            </div>
          )}
        </div>
      </div>
      <div className="text-neutral-900 text-sm font-bold font-['Satoshi'] leading-5">
        {label}
      </div>
    </div>
  );
}
