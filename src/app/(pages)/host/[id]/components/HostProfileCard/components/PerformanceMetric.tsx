import { TrendingUp, Clock, CheckCircle } from "lucide-react";
import { PerformanceMetric as PerformanceMetricType } from "../../../types";

interface PerformanceMetricProps {
  metric: PerformanceMetricType;
}

const iconMap = {
  chart: TrendingUp,
  clock: Clock,
  check: CheckCircle,
};

export function PerformanceMetric({ metric }: PerformanceMetricProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;

  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-neutral-900 text-2xl font-bold font-['Satoshi']">
          {metric.value}
        </span>
        <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
          {metric.label}
        </span>
        <span className="text-neutral-700 text-xs font-medium font-['Satoshi']">
          {metric.description}
        </span>
      </div>
    </div>
  );
}
