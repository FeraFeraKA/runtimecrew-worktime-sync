import { cn } from "@/lib/utils";
import { availabilityStatusMeta } from "@/shared/types/availability/availability.meta";
import type {
  AvailabilityHeatmapSlotDto,
  AvailabilitySelectedSlotDto,
} from "@/shared/types/availability/availability.types";
import AvailabilityEmployeeRow from "./AvailabilityEmployeeRow";

interface IAvailabilityHeatmapProps {
  slots: AvailabilityHeatmapSlotDto[];
  selectedSlotId: string;
  selectedSlot: AvailabilitySelectedSlotDto;
  onSlotSelect: (slotId: string) => void;
}

const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const times = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
];

const AvailabilityHeatmap = ({
  slots,
  selectedSlotId,
  selectedSlot,
  onSlotSelect,
}: IAvailabilityHeatmapProps) => {
  const slotByKey = new Map(
    slots.map((slot) => [`${slot.day}-${slot.time}`, slot]),
  );

  return (
    <section className="flex min-h-0 min-w-0 flex-col overflow-hidden border bg-sidebar p-4 xl:col-span-5 xl:row-span-4">
      <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-semibold">Карта доступности команды</h2>
        <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(availabilityStatusMeta).map(([status, meta]) => (
            <div key={status} className="flex min-w-0 items-center gap-2">
              <span
                className={cn("size-3 shrink-0 rounded-xs", meta.dotClassName)}
              />
              <span className="min-w-0">{meta.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 min-w-0 overflow-x-auto">
        <div className="min-w-180">
          <div className="grid grid-cols-[6.5rem_repeat(5,minmax(0,1fr))] gap-1 text-sm">
            <div className="font-medium">Время</div>
            {days.map((day) => (
              <div key={day} className="text-center font-medium">
                {day}
              </div>
            ))}
            {times.map((time) => (
              <div key={time} className="contents">
                <div className="text-muted-foreground">{time}</div>
                {days.map((day) => {
                  const slot = slotByKey.get(`${day}-${time}`);
                  const meta = slot
                    ? availabilityStatusMeta[slot.status]
                    : availabilityStatusMeta.unavailable;

                  return (
                    <button
                      key={`${day}-${time}`}
                      type="button"
                      aria-label={`${day}, ${time}: ${meta.label}`}
                      aria-pressed={slot?.id === selectedSlotId}
                      onClick={() => {
                        if (slot) {
                          onSlotSelect(slot.id);
                        }
                      }}
                      className={cn(
                        "h-6 rounded-xs border border-sidebar transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        meta.cellClassName,
                        slot?.id === selectedSlotId &&
                          "ring-2 ring-foreground/60",
                      )}
                      title={`${day}, ${time}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col border-t pt-4">
        <div className="mb-3 flex shrink-0 items-center gap-2 text-sm">
          <span className="font-medium">Детали выбранного слота:</span>
          <span className="text-muted-foreground">
            {selectedSlot.day}, {selectedSlot.time}
          </span>
        </div>
        <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto pr-1 lg:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <span className="size-2 rounded-full bg-emerald-600" />
              Доступны ({selectedSlot.available.length})
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              {selectedSlot.available.map((item) => (
                <AvailabilityEmployeeRow
                  key={item.employee.id}
                  item={item}
                  showTag={false}
                />
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <span className="size-2 rounded-full bg-rose-500" />
              Недоступны ({selectedSlot.unavailable.length})
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              {selectedSlot.unavailable.map((item) => (
                <AvailabilityEmployeeRow
                  key={item.employee.id}
                  item={item}
                  showTag={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityHeatmap;
