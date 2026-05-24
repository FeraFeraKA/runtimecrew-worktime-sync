import { cn, getEmployeeInitials } from "@/lib/utils";
import {
  availabilityFlexibleBadgeClassName,
  availabilityIssueMeta,
} from "@/shared/types/availability/availability.meta";
import type { AvailabilityEmployeeDto } from "@/shared/types/availability/availability.types";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Badge } from "../../badge";

interface IAvailabilityEmployeeRowProps {
  item: AvailabilityEmployeeDto;
  showTag?: boolean;
}

const AvailabilityEmployeeRow = ({
  item,
  showTag = true,
}: IAvailabilityEmployeeRowProps) => {
  const badgeClassName =
    item.tagType === "flexible"
      ? availabilityFlexibleBadgeClassName
      : item.tagType
        ? availabilityIssueMeta[item.tagType].badgeClassName
        : undefined;

  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-0.5 text-sm sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto]">
      <Avatar className="size-7">
        <AvatarImage src={item.employee.avatarUrl} />
        <AvatarFallback>{getEmployeeInitials(item.employee.fullName)}</AvatarFallback>
      </Avatar>
      <span className="truncate">{item.employee.fullName}</span>
      <span className="truncate text-muted-foreground">{item.roleLabel}</span>
      {showTag && item.tag && badgeClassName && (
        <Badge
          variant="outline"
          className={cn("border-transparent", badgeClassName)}
        >
          {item.tag}
        </Badge>
      )}
    </div>
  );
};

export default AvailabilityEmployeeRow;
