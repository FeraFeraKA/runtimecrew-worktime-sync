import type { EmployeeProductivityPointDto } from "@/shared/types/employee-profile/employee-profile.types";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IEmployeeProductivityChartProps {
  productivity: EmployeeProductivityPointDto[];
}

const EmployeeProductivityChart = ({
  productivity,
}: IEmployeeProductivityChartProps) => {
  return (
    <div className="flex min-h-80 flex-col border bg-sidebar p-3 xl:col-span-2 xl:row-span-2 xl:min-h-0">
      <h2 className="font-bold">Продуктивность по часам</h2>
      <div className="h-72 min-h-0 flex-1 xl:h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={productivity}
            margin={{ top: 8, right: 10, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient
                id="employee-productivity-line"
                x1="0"
                y1="1"
                x2="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient
                id="employee-productivity-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.28} />
                <stop offset="50%" stopColor="#fef3c7" stopOpacity={0.38} />
                <stop offset="100%" stopColor="#fee2e2" stopOpacity={0.34} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
              width={38}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="productivityPercent"
              stroke="url(#employee-productivity-line)"
              strokeWidth={2}
              fill="url(#employee-productivity-fill)"
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeProductivityChart;
