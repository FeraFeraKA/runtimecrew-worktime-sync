import { QueryErrorState, QueryLoadingState } from "@/components/layout/QueryState";
import Employees from "@/components/layout/Employees";
import useGetEmployeesData from "@/hooks/employees/useGetEmployeesData";
import { useTeamPeriodParams } from "@/hooks/useTeamPeriodParams";

const EmployeesPage = () => {
  const params = useTeamPeriodParams();
  const { data, error, isError, isPending, refetch } = useGetEmployeesData(params);

  if (isPending) {
    return <QueryLoadingState />;
  }

  if (isError || !data) {
    return <QueryErrorState error={error} onRetry={() => void refetch()} />;
  }

  return <Employees data={data} />;
};

export default EmployeesPage;
