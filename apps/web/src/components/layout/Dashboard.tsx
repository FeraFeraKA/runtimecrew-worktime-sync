import type {
  DashboardKpisDto,
  EmployeeDiagnosticSummaryDto,
  RecommendationDto,
  RiskDistributionDto,
} from "@/shared/types/dashboard.types";
import { KpiCard } from "../ui/custom/dashboard/KpiCard";
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
        <KpiCard key={kpi.key} kpi={kpi} />
      ))}
      <ProblematicTable problematicEmployees={problematicEmployees} />
      <TopRecommendations topRecommendations={topRecommendations} />
      <div className="xl:col-span-3 xl:row-span-2 bg-sidebar border flex flex-col flex-1 p-3">
        <span className="text-xl font-bold text-center">
          Распределение риска
        </span>
        <RiskBarChart />
      </div>
    </section>
  );
};

export default Dashboard;
