import { cn } from "@/lib/utils";
import { severityMeta } from "@/shared/types/dashboard/dashboard.meta";
import type { EmployeeConflictDto } from "@/shared/types/employee-profile/employee-profile.types";
import { CalendarDays } from "lucide-react";
import { Badge } from "../../badge";
import { Button } from "../../button";
import { ScrollArea } from "../../scroll-area";

interface IEmployeeTopConflictsProps {
  conflicts: EmployeeConflictDto[];
}

const EmployeeTopConflicts = ({ conflicts }: IEmployeeTopConflictsProps) => {
  return (
    <div className="flex min-h-0 flex-col border bg-sidebar xl:col-span-2 xl:row-span-2">
      <div className="flex shrink-0 items-center justify-between border-b p-3">
        <h2 className="font-bold">Топ конфликты</h2>
        <Button type="button" variant="link" className="h-auto px-0">
          Смотреть все
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 p-3">
          {conflicts.map((conflict) => {
            const severity = severityMeta[conflict.severity];

            return (
              <div
                key={conflict.id}
                className="flex flex-col min-[400px]:flex-row items-center gap-3 rounded-xs border p-2"
              >
                <CalendarDays className="size-7 shrink-0 border p-1 text-blue-600" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {conflict.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {conflict.startTime} - {conflict.endTime}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0 gap-1.5 border-transparent",
                    severity.badgeClassName,
                  )}
                >
                  <span className="size-2 rounded-full bg-current" />
                  {severity.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmployeeTopConflicts;
