import { cn } from "@/lib/utils";
import type { EmployeeTableRowDto } from "@/shared/types/employees/employees.types";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";

interface ProductivityChartProps {
  employees: EmployeeTableRowDto[];
}

type ProductivitySegment = {
  start: number;
  end: number;
  value: number;
};

const START_TIME = "08:00";
const END_TIME = "18:00";
const INTERVAL_MINUTES = 15;

const START_MINUTES = toMinutes(START_TIME);
const END_MINUTES = toMinutes(END_TIME);
const TOTAL_MINUTES = END_MINUTES - START_MINUTES;
const TIME_LABELS = buildTimeLabels(START_MINUTES, END_MINUTES, 60);

const ProductivityChart = ({ employees }: ProductivityChartProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden border bg-sidebar xl:col-span-5 xl:row-span-2">
      <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-b px-4 py-3 lg:flex-row">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold">Продуктивность по времени</h2>
          <p className="text-xs text-muted-foreground">
            {START_TIME}-{END_TIME}, интервал {INTERVAL_MINUTES} мин
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <LegendDot className="bg-red-400" label="0%" />
          <LegendDot className="bg-yellow-300" label="50%" />
          <LegendDot className="bg-cyan-400" label="100%" />
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <Table className="min-w-250">
          <TableHeader>
            <TableRow>
              <TableHead>Сотрудник</TableHead>
              <TableHead className="px-0">
                <TimelineScale />
              </TableHead>
              <TableHead className="text-center">Среднее</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((row, index) => {
              const segments = buildSegments(row.productivityPercent, index);

              return (
                <TableRow key={row.employee.id}>
                  <TableCell className="pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={row.employee.avatarUrl} />
                        <AvatarFallback>CN</AvatarFallback>
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
                    <TimelineStrip segments={segments} />
                  </TableCell>

                  <TableCell
                    className={cn(
                      "text-center",
                      getProductivityClassName(row.productivityPercent),
                    )}
                  >
                    {row.productivityPercent}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

function TimelineScale() {
  const hourLabels = TIME_LABELS.slice(0, -1);

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

function TimelineStrip({ segments }: { segments: ProductivitySegment[] }) {
  return (
    <div className="relative h-9 overflow-hidden bg-background">
      {TIME_LABELS.map((label, index) => (
        <span
          key={label}
          className={cn(
            "absolute inset-y-0 border-l border-border/80 first:border-l-0",
          )}
          style={{ left: `${getLinePosition(index)}%` }}
        />
      ))}

      <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2">
        {segments.map((segment) => {
          const left = ((segment.start - START_MINUTES) / TOTAL_MINUTES) * 100;
          const width = ((segment.end - segment.start) / TOTAL_MINUTES) * 100;

          return (
            <div
              key={`${segment.start}-${segment.end}`}
              title={`${formatTime(segment.start)}-${formatTime(segment.end)}: ${
                segment.value
              }%`}
              className="absolute top-0 h-full rounded-xs"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                background: getProductivityBackground(segment.value),
              }}
            />
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

function buildSegments(average: number, rowIndex: number) {
  const segments: ProductivitySegment[] = [];

  for (
    let current = START_MINUTES;
    current < END_MINUTES;
    current += INTERVAL_MINUTES
  ) {
    const slotIndex = (current - START_MINUTES) / INTERVAL_MINUTES;
    const isLow = (slotIndex * 5 + rowIndex * 7) % 17 === 0;
    const isMiddle = (slotIndex * 3 + rowIndex * 5) % 11 === 0;
    const variation = ((slotIndex * 13 + rowIndex * 17) % 23) - 11;
    const value = isLow
      ? 14 + ((slotIndex + rowIndex) % 12)
      : isMiddle
        ? 48 + ((slotIndex + rowIndex * 2) % 14)
        : average + variation;

    segments.push({
      start: current,
      end: current + INTERVAL_MINUTES,
      value: clamp(value, 0, 100),
    });
  }

  return segments;
}

function getProductivityBackground(value: number) {
  const hue = value <= 50 ? (value / 50) * 47 : 47 + ((value - 50) / 50) * 135;
  const saturation = value <= 50 ? 82 : 72;
  const lightness = value <= 50 ? 61 : 54;

  return `linear-gradient(90deg, hsl(${hue} ${saturation}% ${lightness}%), hsl(${hue} ${saturation}% ${Math.max(lightness - 5, 42)}%))`;
}

function getProductivityClassName(value: number) {
  return value >= 80
    ? "text-cyan-600"
    : value >= 55
      ? "text-yellow-600"
      : "text-red-600";
}

function buildTimeLabels(start: number, end: number, step: number) {
  const labels: string[] = [];

  for (let current = start; current <= end; current += step) {
    labels.push(formatTime(current));
  }

  return labels;
}

function getLinePosition(index: number) {
  return (index / (TIME_LABELS.length - 1)) * 100;
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(restMinutes).padStart(
    2,
    "0",
  )}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default ProductivityChart;
