interface Tab {
  label: string;
  active?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  onTabChange?: (index: number) => void;
}

export function TabNavigation({ tabs, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b-2 border-gray-200 flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange?.(index)}
          className={`px-3 sm:px-6 py-3 sm:py-4 relative whitespace-nowrap ${
            tab.active
              ? 'text-neutral-900 font-bold'
              : 'text-neutral-700 font-bold'
          } text-sm sm:text-base font-['Satoshi'] leading-6`}
        >
          {tab.label}
          {tab.active && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
          )}
        </button>
      ))}
    </div>
  );
}
