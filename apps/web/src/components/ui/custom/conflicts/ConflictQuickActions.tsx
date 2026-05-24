import { cn } from "@/lib/utils";
import { conflictTypeMeta } from "@/shared/types/conflicts/conflicts.meta";
import type { ConflictQuickActionDto } from "@/shared/types/conflicts/conflicts.types";
import { ArrowRight, CalendarClock, Globe2, UserRoundCog } from "lucide-react";
import { Button } from "../../button";

interface IConflictQuickActionsProps {
  actions: ConflictQuickActionDto[];
}

const quickActionIcons = {
  event_outside_working_hours: CalendarClock,
  schedule_calendar_mismatch: CalendarClock,
  timezone_conflict: Globe2,
  exception_conflict: UserRoundCog,
  overload_conflict: CalendarClock,
  work_format_mismatch: UserRoundCog,
};

const ConflictQuickActions = ({ actions }: IConflictQuickActionsProps) => {
  return (
    <aside className="flex min-h-0 min-w-0 flex-col overflow-hidden border bg-sidebar p-4 xl:col-span-2 xl:row-span-3">
      <h2 className="shrink-0 font-semibold">Быстрые действия</h2>
      <div className="mt-4 flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {actions.map((action) => {
          const meta = conflictTypeMeta[action.type];
          const Icon = quickActionIcons[action.type];

          return (
            <Button
              key={action.id}
              type="button"
              variant="outline"
              className="h-auto min-w-0 justify-start rounded-xs bg-background p-3 text-left"
            >
              <span
                className={cn(
                  "shrink-0 rounded-md p-2",
                  meta.iconWrapperClassName,
                )}
              >
                <Icon className={cn("size-5", meta.iconClassName)} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug whitespace-normal">
                  {action.title}
                </span>
                <span className="block leading-snug whitespace-normal text-muted-foreground">
                  {action.subtitle}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0" />
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default ConflictQuickActions;
