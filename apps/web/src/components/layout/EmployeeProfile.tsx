import type { EmployeeProfileResponse } from "@/shared/types/employee-profile/employee-profile.types";
import EmployeeOverloadedDays from "../ui/custom/employee-profile/EmployeeOverloadedDays";
import EmployeeProfileCard from "../ui/custom/employee-profile/EmployeeProfileCard";
import EmployeeProductivityChart from "../ui/custom/employee-profile/EmployeeProductivityChart";
import EmployeeRiskDonutChart from "../ui/custom/employee-profile/EmployeeRiskDonutChart";
import EmployeeStatisticsCard from "../ui/custom/employee-profile/EmployeeStatisticsCard";
import EmployeeTopConflicts from "../ui/custom/employee-profile/EmployeeTopConflicts";

interface IEmployeeProfileProps {
  data: EmployeeProfileResponse;
}

const EmployeeProfile = ({ data }: IEmployeeProfileProps) => {
  return (
    <section className="grid min-h-0 min-w-0 flex-1 gap-4 overflow-x-hidden overflow-y-auto xl:grid-cols-6 xl:grid-rows-4">
      <EmployeeProfileCard employee={data.employee} />
      <EmployeeStatisticsCard statistics={data.statistics} />
      <EmployeeProductivityChart productivity={data.productivity} />
      <EmployeeRiskDonutChart riskDistribution={data.riskDistribution} />
      <EmployeeTopConflicts conflicts={data.topConflicts} />
      <EmployeeOverloadedDays days={data.overloadedDays} />
    </section>
  );
};

export default EmployeeProfile;
