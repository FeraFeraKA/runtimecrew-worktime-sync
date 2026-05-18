import Dashboard from "@/components/layout/Dashboard";
import { mockDashboardResponse } from "@/shared/mock/dashboard.mock";

const data = mockDashboardResponse;

const DashboardPage = () => {
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
