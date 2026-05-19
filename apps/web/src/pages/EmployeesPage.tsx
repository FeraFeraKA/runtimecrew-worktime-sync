import Employees from "@/components/layout/Employees";
import { mockEmployeesResponse } from "@/shared/mock/employees.mock";

const EmployeesPage = () => {
  const data = mockEmployeesResponse;

  return <Employees kpis={data.kpis} employees={data.employees} />;
};

export default EmployeesPage;
