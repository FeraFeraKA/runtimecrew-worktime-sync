import type { EmployeeOverloadedDayDto } from "@/shared/types/employee-profile/employee-profile.types";

interface IEmployeeOverloadedDaysProps {
  days: EmployeeOverloadedDayDto[];
}

const EmployeeOverloadedDays = ({ days }: IEmployeeOverloadedDaysProps) => {
  return (
    <div className="flex min-h-56 flex-col border bg-sidebar p-3 xl:col-span-6 xl:row-span-1">
      <h2 className="font-bold">Перегруженные дни</h2>
      <div className="mt-3 grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {days.map((day) => (
          <div key={day.id} className="flex min-h-32 min-w-0 flex-col border p-3">
            <p className="font-semibold">{day.dateLabel}</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              {day.durationLabel}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {day.statusLabel}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {day.optimumPercent}% от оптимума
            </p>
            <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-red-600"
                style={{ width: `${Math.min(day.optimumPercent, 180) / 1.8}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeOverloadedDays;
