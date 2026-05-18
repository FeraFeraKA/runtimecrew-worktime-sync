import { formatWorkFormat } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EmployeeDiagnosticSummaryDto } from "@/shared/types/dashboard.types";
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
import CustomBadge from "../CustomBadge";

interface IProblematicTableProps {
  problematicEmployees: EmployeeDiagnosticSummaryDto[];
}

const ProblematicTable = ({ problematicEmployees }: IProblematicTableProps) => {
  return (
    <div className="min-w-0 min-h-0 max-h-screen xl:max-h-none overflow-hidden xl:col-span-6 xl:row-span-4 bg-sidebar border flex flex-col h-full">
      <span className="shrink-0 text-center mt-3 mb-1 font-bold text-xl">
        Проблемные сотрудники
      </span>
      <div className="min-h-0 flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Сотрудник</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Часовой пояс</TableHead>
              <TableHead>Формат работы</TableHead>
              <TableHead>Актуальность</TableHead>
              <TableHead>Риск</TableHead>
              <TableHead>Главная причина</TableHead>
              <TableHead>Рекомендованное действие</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problematicEmployees.map((data) => (
              <TableRow key={data.employee.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={data.employee.avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{data.employee.fullName}</span>
                </TableCell>
                <TableCell>{data.role}</TableCell>
                <TableCell>{data.timezone}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-blue-200 text-blue-600"
                  >
                    {formatWorkFormat(data.workFormat)}
                  </Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    data.actualityScore > 80
                      ? "text-green-600"
                      : data.actualityScore > 60
                        ? "text-orange-500"
                        : "text-red-600",
                  )}
                >
                  {data.actualityScore}%
                </TableCell>
                <TableCell>
                  <CustomBadge severity={data.severity} />
                </TableCell>
                <TableCell>{data.mainReason}</TableCell>
                <TableCell>{data.recommendedAction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProblematicTable;
