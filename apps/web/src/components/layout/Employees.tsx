import type { EmployeesPageResponse } from "@/shared/types/employees/employees.types";
import EmployeesTable from "../ui/custom/employees/EmployeesTable";
import KpiCardEmployee from "../ui/custom/employees/KpiCardEmployee";
import ProductivityChart from "../ui/custom/employees/ProductivityChart";

interface IEmployeesProps {
  data: EmployeesPageResponse;
}

const Employees = ({ data }: IEmployeesProps) => {
  return (
    <section className="grid min-h-0 min-w-0 flex-1 gap-4 overflow-hidden xl:grid-cols-5 xl:grid-rows-5">
      {data.kpis.map((kpi) => (
        <KpiCardEmployee key={kpi.key} kpi={kpi} />
      ))}
      <EmployeesTable employees={data.employees} />
      <ProductivityChart data={data.productivityTimeline} />
    </section>
  );
};

export default Employees;
