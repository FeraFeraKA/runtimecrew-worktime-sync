import EmployeeProfile from "@/components/layout/EmployeeProfile";
import {
  QueryErrorState,
  QueryLoadingState,
} from "@/components/layout/QueryState";
import useGetEmployeeProfileData from "@/hooks/employee-profile/useGetEmployeeProfileData";
import { useTeamPeriodParams } from "@/hooks/useTeamPeriodParams";
import { DEFAULT_EMPLOYEE_ID } from "@/shared/config/defaults";
import { useParams, useSearchParams } from "react-router";

const EmployeeProfilePage = () => {
  const params = useTeamPeriodParams();
  const { employeeId: employeeIdParam } = useParams<{ employeeId: string }>();
  const [searchParams] = useSearchParams();
  const employeeId =
    employeeIdParam ?? searchParams.get("employeeId") ?? DEFAULT_EMPLOYEE_ID;
  const { data, error, isError, isPending, refetch } =
    useGetEmployeeProfileData({
      ...params,
      employeeId,
    });

  if (isPending) {
    return <QueryLoadingState />;
  }

  if (isError || !data) {
    return <QueryErrorState error={error} onRetry={() => void refetch()} />;
  }

  return <EmployeeProfile data={data} />;
};

export default EmployeeProfilePage;
