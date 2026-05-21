import Employees from "@/components/layout/Employees";
import { mockEmployeesResponse } from "@/shared/mock/employees.mock";

const EmployeesPage = () => {
  const data = mockEmployeesResponse;

  return <Employees data={data} />;
};

export default EmployeesPage;
