import { cn, getEmployeeInitials } from "@/lib/utils";
import {
  buildProductivityTimelineTimeLabels,
  dateTimeToProductivityTimelineMinutes,
  formatProductivityTimelineDateTime,
  getProductivityBackground,
  getProductivityClassName,
  productivitySegmentStatusMeta,
  toProductivityTimelineMinutes,
} from "@/shared/types/employees/employees.meta";
import type {
  EmployeeProductivitySegmentDto,
  EmployeeProductivityTimelineDto,
} from "@/shared/types/employees/employees.types";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

interface IProductivityChartProps {
  data: EmployeeProductivityTimelineDto;
}

const ProductivityChart = ({ data }: IProductivityChartProps) => {
  const periodStart = toProductivityTimelineMinutes(data.period.startTime);
  const periodEnd = toProductivityTimelineMinutes(data.period.endTime);
  const timeLabels = buildProductivityTimelineTimeLabels(
    periodStart,
    periodEnd,
    60,
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden border bg-sidebar xl:col-span-5 xl:row-span-2">
      <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-b px-4 py-3 lg:flex-row">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold">Продуктивность по времени</h2>
          <p className="text-xs text-muted-foreground">
            {data.period.startTime}-{data.period.endTime}, интервал{" "}
            {data.period.intervalMinutes} мин
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <LegendDot className="bg-red-400" label="0%" />
          <LegendDot className="bg-yellow-300" label="50%" />
          <LegendDot className="bg-cyan-400" label="100%" />
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <TooltipProvider>
          <Table className="min-w-250">
            <TableHeader>
              <TableRow>
                <TableHead>Сотрудник</TableHead>
                <TableHead className="px-0">
                  <TimelineScale timeLabels={timeLabels} />
                </TableHead>
                <TableHead className="text-center">Среднее</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.employees.map((row) => (
                <TableRow key={row.employee.id}>
                  <TableCell className="pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={row.employee.avatarUrl} />
                        <AvatarFallback>
                          {getEmployeeInitials(row.employee.fullName)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {row.employee.fullName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {row.roleLabel}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-full px-0 py-2">
                    <TimelineStrip
                      periodStart={periodStart}
                      periodEnd={periodEnd}
                      segments={row.segments}
                      timeLabels={timeLabels}
                    />
                  </TableCell>

                  <TableCell
                    className={cn(
                      "text-center",
                      getProductivityClassName(row.averageProductivityPercent),
                    )}
                  >
                    {row.averageProductivityPercent}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  );
};

function TimelineScale({ timeLabels }: { timeLabels: string[] }) {
  const hourLabels = timeLabels.slice(0, -1);

  return (
    <div
      className="relative grid h-10 text-xs text-muted-foreground"
      style={{ gridTemplateColumns: `repeat(${hourLabels.length}, 1fr)` }}
    >
      {hourLabels.map((label) => (
        <div
          key={label}
          className="flex items-center border-l px-2 last:border-r"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function TimelineStrip({
  periodStart,
  periodEnd,
  segments,
  timeLabels,
}: {
  periodStart: number;
  periodEnd: number;
  segments: EmployeeProductivitySegmentDto[];
  timeLabels: string[];
}) {
  const totalMinutes = periodEnd - periodStart;

  return (
    <div className="relative h-9 overflow-hidden bg-background">
      {timeLabels.map((label, index) => (
        <span
          key={label}
          className="absolute inset-y-0 border-l border-border/80 first:border-l-0"
          style={{ left: `${getLinePosition(index, timeLabels.length)}%` }}
        />
      ))}

      <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2">
        {segments.map((segment) => {
          const start = dateTimeToProductivityTimelineMinutes(segment.startAt);
          const end = dateTimeToProductivityTimelineMinutes(segment.endAt);
          const left = ((start - periodStart) / totalMinutes) * 100;
          const width = ((end - start) / totalMinutes) * 100;
          const meta = productivitySegmentStatusMeta[segment.status];

          return (
            <Tooltip key={`${segment.startAt}-${segment.endAt}`}>
              <TooltipTrigger asChild>
                <div
                  className="absolute top-0 h-full rounded-xs"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    background: getProductivityBackground(
                      segment.productivityPercent,
                    ),
                  }}
                />
              </TooltipTrigger>

              <TooltipContent>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn("size-2 rounded-full", meta.dotClassName)}
                    />
                    <span className={meta.textClassName}>
                      {segment.statusLabel}
                    </span>
                  </div>
                  <span className="text-background/80">
                    {formatProductivityTimelineDateTime(segment.startAt)}-
                    {formatProductivityTimelineDateTime(segment.endAt)} ·{" "}
                    {segment.productivityPercent}%
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", className)} />
      {label}
    </span>
  );
}

function getLinePosition(index: number, labelsCount: number) {
  return (index / (labelsCount - 1)) * 100;
}

export default ProductivityChart;
