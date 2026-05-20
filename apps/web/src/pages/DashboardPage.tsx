import Dashboard from "@/components/layout/Dashboard";
import { mockDashboardResponse } from "@/shared/mock/dashboard.mock";

const data = mockDashboardResponse;

const DashboardPage = () => {
  // TODO: Uncomment when the backend is ready and the API endpoint is working
  // const { data } = useGetDashboardData({
  //   team: {
  //     id: "team-1",
  //     name: "Team 1",
  //   },
  //   period: {
  //     from: "2024-01-01",
  //     to: "2024-01-31",
  //   },
  // });

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
