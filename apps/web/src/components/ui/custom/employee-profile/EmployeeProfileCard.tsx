import { cn, getEmployeeInitials } from "@/lib/utils";
import type { EmployeeProfileDto } from "@/shared/types/employee-profile/employee-profile.types";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";

interface IEmployeeProfileCardProps {
  employee: EmployeeProfileDto;
}

const EmployeeProfileCard = ({ employee }: IEmployeeProfileCardProps) => {
  return (
    <div className="flex min-h-0 flex-col gap-4 border bg-sidebar p-4 xl:col-span-4 xl:row-span-1 xl:flex-row xl:items-center">
      <div className="flex min-w-0 items-center gap-4 xl:w-72">
        <Avatar className="size-24 shrink-0">
          <AvatarImage src={employee.employee.avatarUrl} />
          <AvatarFallback>
            {getEmployeeInitials(employee.employee.fullName)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-xl font-bold">
            {employee.employee.fullName}
          </p>
          <p className="truncate text-muted-foreground">{employee.roleLabel}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span
              className={cn(
                "size-2 rounded-full",
                employee.status === "actual" ? "bg-green-600" : "bg-red-600",
              )}
            />
            <span>{employee.statusLabel}</span>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 flex-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        <ProfileField label="Почта" value={employee.email} />
        <ProfileField label="Команда" value={employee.teamName} />
        <ProfileField label="Часовой пояс" value={employee.timezoneLabel} />
        <ProfileField label="Формат работы" value={employee.workFormatLabel} />
        <ProfileField label="Роль" value={employee.roleLabel} />
        <ProfileField label="Дата найма" value={employee.hiredAtLabel} />
      </div>
    </div>
  );
};

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="truncate">{value}</p>
    </div>
  );
}

export default EmployeeProfileCard;
