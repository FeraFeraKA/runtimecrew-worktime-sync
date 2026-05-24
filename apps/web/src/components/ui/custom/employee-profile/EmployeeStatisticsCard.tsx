import type { EmployeeProfileStatisticsDto } from "@/shared/types/employee-profile/employee-profile.types";

interface IEmployeeStatisticsCardProps {
  statistics: EmployeeProfileStatisticsDto;
}

const EmployeeStatisticsCard = ({
  statistics,
}: IEmployeeStatisticsCardProps) => {
  return (
    <div className="flex min-h-0 flex-col border bg-sidebar p-2.5 xl:col-span-2 xl:row-span-1">
      <h2 className="text-sm font-bold 2xl:text-base">Общая статистика</h2>
      <div className="my-auto grid w-full grid-cols-2 gap-1 2xl:grid-cols-4">
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
    <div className="flex min-h-12 flex-col justify-center bg-muted/30 px-2 py-1.5 2xl:min-h-20 2xl:p-3">
      <p className={`text-xl font-bold 2xl:text-3xl ${className}`}>
        {value}
      </p>
      <p className="mt-0.5 truncate text-xs 2xl:mt-2 2xl:text-sm">{label}</p>
    </div>
  );
}

export default EmployeeStatisticsCard;
