import { cn } from "@/lib/utils";
import { conflictTypeMeta } from "@/shared/types/conflicts/conflicts.meta";
import type { ConflictTypeSummaryDto } from "@/shared/types/conflicts/conflicts.types";

interface IConflictTypeSummaryProps {
  items: ConflictTypeSummaryDto[];
}

const ConflictTypeSummary = ({ items }: IConflictTypeSummaryProps) => {
  return (
    <aside className="flex min-h-0 flex-col overflow-hidden border bg-sidebar p-4 xl:col-span-2 xl:row-span-2">
      <h2 className="shrink-0 font-semibold">Сводка по типам</h2>
      <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
        {items.map((item) => {
          const meta = conflictTypeMeta[item.type];

          return (
            <div
              key={item.type}
              className="flex items-center justify-between gap-3 border-b py-3 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className={cn("size-2 rounded-full", meta.dotClassName)} />
                <span className="truncate">{item.label}</span>
              </div>
              <span>{item.count}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default ConflictTypeSummary;
