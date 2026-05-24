import Dashboard from "@/components/layout/Dashboard";
import { QueryErrorState, QueryLoadingState } from "@/components/layout/QueryState";
import useGetDashboardData from "@/hooks/dashboard/useGetDashboardData";
import { useTeamPeriodParams } from "@/hooks/useTeamPeriodParams";

const DashboardPage = () => {
  const params = useTeamPeriodParams();
  const { data, error, isError, isPending, refetch } = useGetDashboardData(params);

  if (isPending) {
    return <QueryLoadingState />;
  }

  if (isError || !data) {
    return <QueryErrorState error={error} onRetry={() => void refetch()} />;
  }

  return (
    <Dashboard
      kpis={data.kpis}
      problematicEmployees={data.problematicEmployees}
      topRecommendations={data.topRecommendations}
      riskDistribution={data.riskDistribution}
    />
  );
};

export default DashboardPage;
