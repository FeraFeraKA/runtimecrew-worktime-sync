import type {
  DashboardKpisDto,
  EmployeeDiagnosticSummaryDto,
  RecommendationDto,
  RiskDistributionDto,
} from "@/shared/types/dashboard/dashboard.types";
import { dashboardKpiMeta } from "@/shared/types/dashboard/dashboard.meta";
import MetricCard from "../ui/custom/MetricCard";
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
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 xl:gap-4">
        {kpis.map((kpi) => {
          const meta = dashboardKpiMeta[kpi.key];

          return (
            <MetricCard
              key={kpi.key}
              title={kpi.title}
              value={kpi.unit === "%" ? `${kpi.value}%` : kpi.value}
              changeValue={kpi.changePercent}
              changeLabel={kpi.changeLabel}
              icon={meta.icon}
              valueClassName={meta.valueClassName}
              iconClassName={meta.iconClassName}
              iconWrapperClassName={meta.iconWrapperClassName}
            />
          );
        })}
      </div>
      <div className="grid min-h-0 min-w-0 shrink-0 gap-4 xl:grid-cols-9 xl:grid-rows-4 xl:flex-1">
        <ProblematicTable problematicEmployees={problematicEmployees} />
        <TopRecommendations topRecommendations={topRecommendations} />
        <RiskBarChart riskDistribution={riskDistribution} />
      </div>
    </section>
  );
};

export default Dashboard;
