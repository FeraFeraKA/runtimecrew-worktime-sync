import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { risk: "Крит.", count: 30, color: "#dc2626" },
  { risk: "Высокий", count: 12, color: "#ea580c" },
  { risk: "Средний", count: 5, color: "#ca8a04" },
  { risk: "Низкий", count: 8, color: "#16a34a" },
];

const RiskBarChart = () => {
  return (
    <div className="h-60 xl:h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 8, left: -32, bottom: -6 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="risk"
            tick={{ fontSize: 12 }}
          />
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
  );
};

export default RiskBarChart;
