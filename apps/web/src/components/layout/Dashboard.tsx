import type {
  DashboardKpisDto,
  EmployeeDiagnosticSummaryDto,
  RecommendationDto,
  RiskDistributionDto,
} from "@/shared/types/dashboard.types";
import { ArrowRightIcon, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { KpiCard } from "../ui/custom/dashboard/KpiCard";
import ProblematicTable from "../ui/custom/dashboard/ProblematicTable";
import RiskBarChart from "../ui/custom/dashboard/RiskBarChart";

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
      <div className="min-w-0 min-h-0 max-h-screen xl:max-h-none overflow-hidden xl:col-span-6 xl:row-span-4 bg-sidebar border flex flex-col h-full">
        <ProblematicTable problematicEmployees={problematicEmployees} />
      </div>
      <div className="xl:col-span-3 xl:row-span-2 bg-sidebar border flex flex-col flex-1 p-3 gap-3.5">
        <span className="text-xl font-bold text-center">Топ рекомендаций</span>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
      </div>
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
