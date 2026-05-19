import { cn } from "@/lib/utils";
import {
  employeeRiskMeta,
  employeeStatusMeta,
  employeeWorkFormatMeta,
} from "@/shared/types/employees/employees.meta";
import type { EmployeeTableRowDto } from "@/shared/types/employees/employees.types";
import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Badge } from "../../badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";

interface EmployeesTableProps {
  employees: EmployeeTableRowDto[];
}

const EmployeesTable = ({ employees }: EmployeesTableProps) => {
  return (
    <div className="min-h-0 overflow-hidden border bg-sidebar xl:col-span-5 xl:row-span-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Сотрудник</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Часовой пояс</TableHead>
            <TableHead>Формат</TableHead>
            <TableHead>Актуальность</TableHead>
            <TableHead>Риск</TableHead>
            <TableHead>Конфликты</TableHead>
            <TableHead>Перегр. дни</TableHead>
            <TableHead>Продуктивность</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-center">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((row) => {
            const statusMeta = employeeStatusMeta[row.status];
            const workFormatMeta = employeeWorkFormatMeta[row.workFormat];

            return (
              <TableRow key={row.employee.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={row.employee.avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{row.employee.fullName}</span>
                </TableCell>
                <TableCell>{row.roleLabel}</TableCell>
                <TableCell>{row.timezoneLabel}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "gap-1 border-transparent",
                      workFormatMeta.badgeClassName,
                    )}
                  >
                    {row.workFormatLabel}
                  </Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    row.actualityScore > 80
                      ? "text-green-600"
                      : row.actualityScore > 60
                        ? "text-orange-500"
                        : "text-red-600",
                  )}
                >
                  {row.actualityScore}%
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-transparent",
                      employeeRiskMeta[row.risk].badgeClassName,
                    )}
                  >
                    {row.riskLabel}
                  </Badge>
                </TableCell>
                <TableCell>{row.conflictsCount}</TableCell>
                <TableCell>{row.overloadedDaysCount}</TableCell>
                <TableCell
                  className={cn(
                    row.actualityScore > 80
                      ? "text-green-600"
                      : row.actualityScore > 60
                        ? "text-orange-500"
                        : "text-red-600",
                  )}
                >
                  {row.productivityPercent}%
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "gap-1.5 border-transparent",
                      statusMeta.badgeClassName,
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        statusMeta.dotClassName,
                      )}
                    />
                    {row.statusLabel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <EllipsisVertical />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesTable;
