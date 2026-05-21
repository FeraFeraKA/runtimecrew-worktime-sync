import { employeeProfileRiskMeta } from "@/shared/types/employee-profile/employee-profile.meta";
import type { EmployeeRiskDistributionItemDto } from "@/shared/types/employee-profile/employee-profile.types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface IEmployeeRiskDonutChartProps {
  riskDistribution: EmployeeRiskDistributionItemDto[];
}

const EmployeeRiskDonutChart = ({
  riskDistribution,
}: IEmployeeRiskDonutChartProps) => {
  const data = riskDistribution.map((item) => ({
    ...item,
    label: employeeProfileRiskMeta[item.risk].label,
    color: employeeProfileRiskMeta[item.risk].color,
  }));

  return (
    <div className="flex min-h-0 flex-col border bg-sidebar p-3 xl:col-span-2 xl:row-span-2">
      <h2 className="font-bold">Распределение риска</h2>
      <div className="grid min-h-0 flex-1 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius="48%"
              outerRadius="78%"
              paddingAngle={0}
            >
              {data.map((item) => (
                <Cell key={item.risk} fill={item.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col gap-3">
          {data.map((item) => (
            <div key={item.risk} className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>
                {item.label} ({item.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeRiskDonutChart;
