import { cn } from "@/lib/utils";
import { dashboardKpiMeta } from "@/shared/types/dashboard/dashboard.meta";
import type { DashboardKpiDto } from "@/shared/types/dashboard/dashboard.types";

interface IKpiCardDashboardProps {
  kpi: DashboardKpiDto;
}

const KpiCardDashboard = ({ kpi }: IKpiCardDashboardProps) => {
  const config = dashboardKpiMeta[kpi.key];
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
        <span className={cn("rounded-md p-1.5", config.iconWrapperClassName)}>
          <Icon className={cn("size-5", config.iconClassName)} />
        </span>
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
};

export default KpiCardDashboard;
