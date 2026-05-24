import type { AvailabilityPageResponse } from "@/shared/types/availability/availability.types";
import { availabilityPageKpiMeta } from "@/shared/types/availability/availability.meta";
import { useMemo, useState } from "react";
import AvailabilityBestSlots from "../ui/custom/availability/AvailabilityBestSlots";
import AvailabilityHeatmap from "../ui/custom/availability/AvailabilityHeatmap";
import AvailabilityProblemDays from "../ui/custom/availability/AvailabilityProblemDays";
import MetricCard from "../ui/custom/MetricCard";

interface IAvailabilityProps {
  data: AvailabilityPageResponse;
}

const Availability = ({ data }: IAvailabilityProps) => {
  const [selectedSlotId, setSelectedSlotId] = useState(data.selectedSlotId);
  const selectedSlot = useMemo(() => {
    return data.slotDetails[selectedSlotId] ?? data.slotDetails[data.selectedSlotId];
  }, [data.selectedSlotId, data.slotDetails, selectedSlotId]);

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
        {data.kpis.map((kpi) => {
          const meta = availabilityPageKpiMeta[kpi.key];

          return (
            <MetricCard
              key={kpi.key}
              title={kpi.title}
              value={kpi.value}
              changeValue={kpi.changeValue}
              changeLabel={kpi.changeLabel}
              icon={meta.icon}
              valueClassName={meta.valueClassName}
              iconClassName={meta.iconClassName}
              iconWrapperClassName={meta.iconWrapperClassName}
            />
          );
        })}
      </div>
      <div className="grid min-h-0 min-w-0 shrink-0 gap-4 xl:min-h-155 xl:flex-1 xl:grid-cols-7 xl:grid-rows-4">
        <AvailabilityHeatmap
          slots={data.heatmap}
          selectedSlotId={selectedSlotId}
          selectedSlot={selectedSlot}
          onSlotSelect={setSelectedSlotId}
        />
        <AvailabilityBestSlots slots={data.bestSlots} />
        <AvailabilityProblemDays days={data.problemDays} />
      </div>
    </section>
  );
};

export default Availability;
