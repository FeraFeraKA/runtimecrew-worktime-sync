import type { ConflictsPageResponse } from "@/shared/types/conflicts/conflicts.types";
import { conflictsPageKpiMeta } from "@/shared/types/conflicts/conflicts.meta";
import ConflictQuickActions from "../ui/custom/conflicts/ConflictQuickActions";
import ConflictsTable from "../ui/custom/conflicts/ConflictsTable";
import ConflictTypeSummary from "../ui/custom/conflicts/ConflictTypeSummary";
import MetricCard from "../ui/custom/MetricCard";

interface IConflictsProps {
  data: ConflictsPageResponse;
}

const Conflicts = ({ data }: IConflictsProps) => {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4">
        {data.kpis.map((kpi) => {
          const meta = conflictsPageKpiMeta[kpi.key];

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
      <div className="grid min-h-0 min-w-0 shrink-0 gap-4 xl:grid-cols-7 xl:grid-rows-5 xl:flex-1">
        <ConflictsTable conflicts={data.conflicts} />
        <ConflictTypeSummary items={data.typeSummary} />
        <ConflictQuickActions actions={data.quickActions} />
      </div>
    </section>
  );
};

export default Conflicts;
