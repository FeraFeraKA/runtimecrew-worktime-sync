import EmployeeProfile from "@/components/layout/EmployeeProfile";
import { mockEmployeeProfileResponse } from "@/shared/mock/employee-profile.mock";

const EmployeeProfilePage = () => {
  const data = mockEmployeeProfileResponse;

  return <EmployeeProfile data={data} />;
};

export default EmployeeProfilePage;
