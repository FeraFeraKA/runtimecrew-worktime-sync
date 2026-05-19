import type {
  DashboardKpisDto,
  EmployeeDiagnosticSummaryDto,
  RecommendationDto,
  RiskDistributionDto,
} from "@/shared/types/dashboard/dashboard.types";
import KpiCardDashboard from "../ui/custom/dashboard/KpiCardDashboard";
import ProblematicTable from "../ui/custom/dashboard/ProblematicTable";
import RiskBarChart from "../ui/custom/dashboard/RiskBarChart";
import TopRecommendations from "../ui/custom/dashboard/TopRecommendations";

interface IDashboardProps {
  kpis: DashboardKpisDto;
  problematicEmployees: EmployeeDiagnosticSummaryDto[];
  topRecommendations: RecommendationDto[];
  riskDistribution: RiskDistributionDto;
}

const Dashboard = ({
  kpis,
  problematicEmployees,
  topRecommendations,
  riskDistribution,
}: IDashboardProps) => {
  return (
    <section className="grid min-h-0 min-w-0 flex-1 overflow-hidden gap-4 xl:grid-cols-9 xl:grid-rows-6">
      {kpis.map((kpi) => (
        <KpiCardDashboard key={kpi.key} kpi={kpi} />
      ))}
      <ProblematicTable problematicEmployees={problematicEmployees} />
      <TopRecommendations topRecommendations={topRecommendations} />
      <RiskBarChart riskDistribution={riskDistribution} />
    </section>
  );
};

export default Dashboard;
