import type { EmployeeProfileStatisticsDto } from "@/shared/types/employee-profile/employee-profile.types";

interface IEmployeeStatisticsCardProps {
  statistics: EmployeeProfileStatisticsDto;
}

const EmployeeStatisticsCard = ({
  statistics,
}: IEmployeeStatisticsCardProps) => {
  return (
    <div className="min-h-0 border bg-sidebar p-3 xl:col-span-2 xl:row-span-1">
      <h2 className="font-bold">Общая статистика</h2>
      <div className="mt-4 grid grid-cols-2 gap-2 xl:grid-cols-4">
        <StatTile
          value={`${statistics.actualityPercent}%`}
          label="Актуальность"
          className="text-green-600"
        />
        <StatTile
          value={statistics.riskLabel}
          label="Риск"
          className="text-red-600"
        />
        <StatTile
          value={statistics.conflictsCount}
          label="Конфликты"
          className="text-violet-600"
        />
        <StatTile
          value={statistics.overloadedDaysCount}
          label="Перегр. дни"
          className="text-red-600"
        />
      </div>
    </div>
  );
};

function StatTile({
  value,
  label,
  className,
}: {
  value: string | number;
  label: string;
  className: string;
}) {
  return (
    <div className="flex min-h-24 flex-col justify-center bg-muted/30 p-3">
      <p className={`text-3xl font-bold ${className}`}>{value}</p>
      <p className="mt-2 text-sm truncate">{label}</p>
    </div>
  );
}

export default EmployeeStatisticsCard;
