import { cn } from "@/lib/utils";
import { employeesPageKpiMeta } from "@/shared/types/employees/employees.meta";
import type { EmployeesPageKpiDto } from "@/shared/types/employees/employees.types";

interface KpiCardEmployeeProps {
  kpi: EmployeesPageKpiDto;
}

const KpiCardEmployee = ({ kpi }: KpiCardEmployeeProps) => {
  const meta = employeesPageKpiMeta[kpi.key];
  const Icon = meta.icon;
  const formattedChangeValue = `${kpi.changeValue > 0 ? "+" : ""}${kpi.changeValue}`;

  return (
    <div className="xl:col-span-1 xl:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2">
      <div className="flex items-center justify-between">
        <span>{kpi.title}</span>
        <span className={cn("rounded-md p-1.5", meta.iconWrapperClassName)}>
          <Icon className={cn("size-5", meta.iconClassName)} />
        </span>
      </div>
      <div className="flex items-center gap-3">
        <p className={cn("text-4xl font-semibold", meta.valueClassName)}>
          {kpi.value}
        </p>

        <p className="text-muted-foreground">
          <span
            className={cn(
              kpi.changeValue > 0 && "text-green-600",
              kpi.changeValue < 0 && "text-red-600",
            )}
          >
            {formattedChangeValue}
          </span>{" "}
          {kpi.changeLabel}
        </p>
      </div>
    </div>
  );
};

export default KpiCardEmployee;
