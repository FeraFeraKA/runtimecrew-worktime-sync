import { cn } from "@/lib/utils";
import { kpiCardConfig } from "@/shared/config/dashboard.config";
import type { DashboardKpiDto } from "@/shared/types/dashboard.types";

interface IKpiCardProps {
  kpi: DashboardKpiDto;
}

export function KpiCard({ kpi }: IKpiCardProps) {
  const config = kpiCardConfig[kpi.key];
  const Icon = config.icon;

  const formattedValue = kpi.unit === "%" ? `${kpi.value}%` : kpi.value;
  const formattedChangePercent = `${kpi.changePercent > 0 ? "+" : ""}${kpi.unit === "%" ? `${kpi.changePercent}%` : kpi.changePercent}`;

  return (
    <div
      key={kpi.key}
      className="xl:col-span-3 xl:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2"
    >
      <div className="flex items-center justify-between">
        <span>{kpi.title}</span>
        <Icon className={config.iconClassName} />
      </div>
      <div className="flex items-center gap-3">
        <p className={cn("text-4xl font-semibold", config.valueClassName)}>
          {formattedValue}
        </p>

        <p className="text-muted-foreground">
          <span
            className={cn(
              kpi.changePercent > 0 && "text-green-600",
              kpi.changePercent < 0 && "text-red-600",
            )}
          >
            {formattedChangePercent}
          </span>{" "}
          {kpi.changeLabel}
        </p>
      </div>
    </div>
  );
}
