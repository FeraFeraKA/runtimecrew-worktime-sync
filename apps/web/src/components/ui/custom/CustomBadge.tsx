import { cn } from "@/lib/utils";
import { severityMeta } from "@/shared/types/dashboard/dashboard.meta";
import type { Severity } from "@/shared/types/types";
import { Badge } from "../badge";

interface ICustomBadgeProps {
  severity: Severity;
  label?: string;
}

const CustomBadge = ({ severity, label }: ICustomBadgeProps) => {
  const meta = severityMeta[severity];

  return (
    <Badge
      variant="outline"
      className={cn("border-transparent", meta.badgeClassName)}
    >
      {label ?? meta.label}
    </Badge>
  );
};

export default CustomBadge;
