import { Award, ShieldCheck, Trophy, MessageCircle } from "lucide-react";
import { Achievement } from "../../../types";

interface AchievementCardProps {
  achievement: Achievement;
}

const iconMap = {
  award: Award,
  verified: ShieldCheck,
  trophy: Trophy,
  message: MessageCircle,
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Award;

  return (
    <div className="w-80 py-6 bg-white rounded-3xl border-2 border-gray-200 flex flex-col items-center gap-4">
      <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-white" strokeWidth={2.67} />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-neutral-900 text-base font-bold font-['Satoshi'] text-center">
          {achievement.title}
        </span>
        <span className="text-neutral-700 text-xs font-medium font-['Satoshi'] text-center">
          {achievement.description}
        </span>
      </div>
    </div>
  );
}
