import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface IMetricCardProps {
  title: string;
  value: string | number;
  changeValue: number;
  changeLabel: string;
  icon: LucideIcon;
  valueClassName: string;
  iconClassName: string;
  iconWrapperClassName: string;
}

const MetricCard = ({
  title,
  value,
  changeValue,
  changeLabel,
  icon: Icon,
  valueClassName,
  iconClassName,
  iconWrapperClassName,
}: IMetricCardProps) => {
  const formattedChangeValue = `${changeValue > 0 ? "+" : ""}${changeValue}`;

  return (
    <div className="flex h-28 min-w-0 flex-col justify-center gap-2 border bg-sidebar p-4">
      <div className="flex min-w-0 items-center justify-between gap-2">
        <span className="truncate">{title}</span>
        <span className={cn("rounded-md p-1.5", iconWrapperClassName)}>
          <Icon className={cn("size-5", iconClassName)} />
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <p className={cn("shrink-0 text-4xl font-semibold", valueClassName)}>
          {value}
        </p>

        <p className="min-w-0 text-muted-foreground">
          <span
            className={cn(
              changeValue > 0 && "text-green-600",
              changeValue < 0 && "text-red-600",
            )}
          >
            {formattedChangeValue}
          </span>{" "}
          {changeLabel}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
