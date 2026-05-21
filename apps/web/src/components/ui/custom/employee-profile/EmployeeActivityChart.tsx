import type { EmployeeActivityPointDto } from "@/shared/types/employee-profile/employee-profile.types";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IEmployeeActivityChartProps {
  activity: EmployeeActivityPointDto[];
}

const EmployeeActivityChart = ({ activity }: IEmployeeActivityChartProps) => {
  return (
    <div className="flex min-h-0 flex-col border bg-sidebar p-3 xl:col-span-2 xl:row-span-2">
      <h2 className="font-bold">Активность</h2>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activity}
            margin={{ top: 24, right: 8, bottom: 0, left: -24 }}
          >
            <CartesianGrid vertical={false} stroke="transparent" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 200]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="linear"
              dataKey="activityScore"
              stroke="hsl(var(--foreground))"
              strokeWidth={1}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeActivityChart;
