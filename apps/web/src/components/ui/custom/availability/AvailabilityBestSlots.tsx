import { cn } from "@/lib/utils";
import {
  availabilityIssueMeta,
  availabilityStatusMeta,
} from "@/shared/types/availability/availability.meta";
import type { AvailabilityMeetingSlotDto } from "@/shared/types/availability/availability.types";
import { Calendar } from "lucide-react";

interface IAvailabilityBestSlotsProps {
  slots: AvailabilityMeetingSlotDto[];
}

const AvailabilityBestSlots = ({ slots }: IAvailabilityBestSlotsProps) => {
  return (
    <aside className="flex min-h-0 min-w-0 flex-col border bg-sidebar p-4 xl:col-span-2 xl:row-span-2">
      <h2 className="shrink-0 font-semibold">Лучшие слоты для встречи</h2>
      <div className="mt-4 flex min-w-0 flex-col gap-3 overflow-y-auto pr-1">
        {slots.map((slot, index) => {
          const isLimited = slot.status === "limited";
          const iconClassName = isLimited
            ? availabilityIssueMeta.outside_hours.iconClassName
            : availabilityStatusMeta.available.dotClassName.replace("bg", "text");
          const wrapperClassName = isLimited ? "bg-orange-50" : "bg-blue-50";

          return (
            <div
              key={slot.id}
              className="flex min-w-0 items-center gap-3 border bg-background p-3"
            >
              <span className={cn("rounded-md p-2", wrapperClassName)}>
                <Calendar className={cn("size-5", iconClassName)} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-medium leading-snug whitespace-normal">
                  {slot.day}, {slot.time}
                </div>
                <div className="text-sm leading-snug whitespace-normal text-muted-foreground">
                  {slot.availableLabel}
                </div>
              </div>
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border text-lg font-semibold",
                  index === 2
                    ? "border-yellow-300 text-yellow-600"
                    : "border-emerald-300 text-emerald-600",
                )}
              >
                {slot.score}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default AvailabilityBestSlots;
