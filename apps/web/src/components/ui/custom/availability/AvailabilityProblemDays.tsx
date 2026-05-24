import { cn } from "@/lib/utils";
import { availabilityIssueMeta } from "@/shared/types/availability/availability.meta";
import type { AvailabilityProblemDayDto } from "@/shared/types/availability/availability.types";

interface IAvailabilityProblemDaysProps {
  days: AvailabilityProblemDayDto[];
}

const AvailabilityProblemDays = ({ days }: IAvailabilityProblemDaysProps) => {
  return (
    <aside className="flex min-h-0 min-w-0 flex-col border bg-sidebar p-4 xl:col-span-2 xl:row-span-2">
      <h2 className="shrink-0 font-semibold">Проблемные дни</h2>
      <div className="mt-4 flex min-w-0 flex-col gap-3 overflow-y-auto pr-1">
        {days.map((day) => {
          const meta = availabilityIssueMeta[day.type];
          const Icon = meta.icon;

          return (
            <div
              key={day.id}
              className="flex min-w-0 items-center gap-3 border bg-background p-3"
            >
              <span className={cn("rounded-md p-2", meta.iconWrapperClassName)}>
                <Icon className={cn("size-5", meta.iconClassName)} />
              </span>
              <div className="min-w-0">
                <div className="truncate font-medium">
                  {day.day}, {day.time}
                </div>
                <div className="truncate text-sm text-muted-foreground">
                  {day.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default AvailabilityProblemDays;
