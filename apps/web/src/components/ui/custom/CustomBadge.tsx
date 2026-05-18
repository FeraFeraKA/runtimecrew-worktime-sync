import { formatSeverity } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";

interface CustomBadgeProps {
  severity: "critical" | "high" | "medium" | "low";
}

const CustomBadge = ({ severity }: CustomBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        severity === "low"
          ? "bg-green-200 text-green-600"
          : severity === "medium"
            ? "bg-yellow-200 text-yellow-600"
            : severity === "high"
              ? "bg-orange-200 text-orange-600"
              : "bg-red-200 text-red-600",
      )}
    >
      {formatSeverity(severity)}
    </Badge>
  );
};

export default CustomBadge;
