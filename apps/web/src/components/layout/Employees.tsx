import type { EmployeesPageResponse } from "@/shared/types/employees/employees.types";
import { employeesPageKpiMeta } from "@/shared/types/employees/employees.meta";
import MetricCard from "../ui/custom/MetricCard";
import EmployeesTable from "../ui/custom/employees/EmployeesTable";
import ProductivityChart from "../ui/custom/employees/ProductivityChart";

interface IEmployeesProps {
  data: EmployeesPageResponse;
}

const Employees = ({ data }: IEmployeesProps) => {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
        {data.kpis.map((kpi) => {
          const meta = employeesPageKpiMeta[kpi.key];

          return (
            <MetricCard
              key={kpi.key}
              title={kpi.title}
              value={kpi.value}
              changeValue={kpi.changeValue}
              changeLabel={kpi.changeLabel}
              icon={meta.icon}
              valueClassName={meta.valueClassName}
              iconClassName={meta.iconClassName}
              iconWrapperClassName={meta.iconWrapperClassName}
            />
          );
        })}
      </div>
      <div className="grid min-h-0 min-w-0 shrink-0 gap-4 xl:grid-cols-5 xl:grid-rows-4 xl:flex-1">
        <EmployeesTable employees={data.employees} />
        <ProductivityChart data={data.productivityTimeline} />
      </div>
    </section>
  );
};

export default Employees;
