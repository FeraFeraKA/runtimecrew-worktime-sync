import { formatSeverity } from "@/lib/format";
import type { RiskDistributionDto } from "@/shared/types/dashboard.types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IRiskBarChartProps {
  riskDistribution: RiskDistributionDto;
}

const RiskBarChart = ({ riskDistribution }: IRiskBarChartProps) => {
  const data = riskDistribution.map((item) => ({
    risk: formatSeverity(item.key),
    count: item.count,
    color: item.color,
  }));

  return (
    <div className="xl:col-span-3 xl:row-span-2 bg-sidebar border flex flex-col flex-1 p-3">
      <span className="text-xl font-bold text-center">Распределение риска</span>
      <div className="h-60 xl:h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 8, left: -32, bottom: -6 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="risk" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="currentColor"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskBarChart;
