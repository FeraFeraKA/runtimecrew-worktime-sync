import { cn, getEmployeeInitials } from "@/lib/utils";
import {
  employeeAllFilterOption,
  employeeRiskFilterOptions,
  employeeRiskMeta,
  employeeStatusFilterOptions,
  employeeStatusMeta,
  employeeWorkFormatMeta,
} from "@/shared/types/employees/employees.meta";
import type {
  EmployeeFilterOption,
  EmployeeRiskFilter,
  EmployeeRoleFilter,
  EmployeeStatusFilter,
  EmployeeTableRowDto,
} from "@/shared/types/employees/employees.types";
import { EllipsisVertical, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Badge } from "../../badge";
import { Button } from "../../button";
import { Input } from "../../input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";
import EmployeeFilterSelect from "./EmployeeFilterSelect";

interface IEmployeesTableProps {
  employees: EmployeeTableRowDto[];
}

const EmployeesTable = ({ employees }: IEmployeesTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<EmployeeRoleFilter>(
    employeeAllFilterOption.value,
  );
  const [timezoneFilter, setTimezoneFilter] = useState<string>(
    employeeAllFilterOption.value,
  );
  const [statusFilter, setStatusFilter] = useState<EmployeeStatusFilter>(
    employeeAllFilterOption.value,
  );
  const [riskFilter, setRiskFilter] = useState<EmployeeRiskFilter>(
    employeeAllFilterOption.value,
  );

  const roleFilterOptions = useMemo<
    EmployeeFilterOption<EmployeeRoleFilter>[]
  >(() => {
    const options = new Map<EmployeeRoleFilter, string>();

    employees.forEach((row) => {
      options.set(row.role, row.roleLabel);
    });

    return [
      employeeAllFilterOption,
      ...Array.from(options, ([value, label]) => ({ value, label })),
    ];
  }, [employees]);

  const timezoneFilterOptions = useMemo<EmployeeFilterOption[]>(() => {
    const options = new Map<string, string>();

    employees.forEach((row) => {
      options.set(row.timezone, row.timezoneLabel);
    });

    return [
      employeeAllFilterOption,
      ...Array.from(options, ([value, label]) => ({ value, label })),
    ];
  }, [employees]);

  // For backend: if the current filter value is not present in the employees data, reset it to "all"
  // useEffect(() => {
  //   if (
  //     roleFilter !== employeeAllFilterOption.value &&
  //     !employees.some((row) => row.role === roleFilter)
  //   ) {
  //     //eslint-disable-next-line react-hooks/set-state-in-effect
  //     setRoleFilter(employeeAllFilterOption.value);
  //   }
  // }, [employees, roleFilter]);

  // useEffect(() => {
  //   if (
  //     timezoneFilter !== employeeAllFilterOption.value &&
  //     !employees.some((row) => row.timezone === timezoneFilter)
  //   ) {
  //     //eslint-disable-next-line react-hooks/set-state-in-effect
  //     setTimezoneFilter(employeeAllFilterOption.value);
  //   }
  // }, [employees, timezoneFilter]);

  const filteredEmployees = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase("ru-RU");

    return employees.filter((row) => {
      const matchesSearch =
        normalizedSearchQuery.length === 0 ||
        [
          row.employee.fullName,
          row.roleLabel,
          row.timezoneLabel,
          row.workFormatLabel,
          row.riskLabel,
          row.statusLabel,
        ]
          .join(" ")
          .toLocaleLowerCase("ru-RU")
          .includes(normalizedSearchQuery);

      return (
        matchesSearch &&
        (roleFilter === employeeAllFilterOption.value ||
          row.role === roleFilter) &&
        (timezoneFilter === employeeAllFilterOption.value ||
          row.timezone === timezoneFilter) &&
        (statusFilter === employeeAllFilterOption.value ||
          row.status === statusFilter) &&
        (riskFilter === employeeAllFilterOption.value ||
          row.risk === riskFilter)
      );
    });
  }, [
    employees,
    riskFilter,
    roleFilter,
    searchQuery,
    statusFilter,
    timezoneFilter,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setRoleFilter(employeeAllFilterOption.value);
    setTimezoneFilter(employeeAllFilterOption.value);
    setStatusFilter(employeeAllFilterOption.value);
    setRiskFilter(employeeAllFilterOption.value);
  };

  return (
    <div className="flex min-h-0 flex-col overflow-hidden border bg-sidebar xl:col-span-5 xl:row-span-2">
      <div className="flex shrink-0 flex-col gap-3 border-b p-2 xl:flex-row xl:items-center">
        <div className="flex h-8 min-w-0 overflow-hidden rounded-xs border bg-background xl:w-40 2xl:w-60 shrink-0">
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Поиск"
            className="h-full rounded-none border-0 focus-visible:ring-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Найти"
            className="h-full w-8 rounded-none"
          >
            <Search className="size-4" />
          </Button>
        </div>

        <EmployeeFilterSelect
          value={roleFilter}
          label="Роль"
          groupLabel="Роли"
          options={roleFilterOptions}
          onValueChange={(value) => setRoleFilter(value as EmployeeRoleFilter)}
        />

        <EmployeeFilterSelect
          value={timezoneFilter}
          label="Часовой пояс"
          groupLabel="Часовые пояса"
          options={timezoneFilterOptions}
          onValueChange={setTimezoneFilter}
        />

        <EmployeeFilterSelect
          value={statusFilter}
          label="Статус"
          groupLabel="Статусы"
          options={employeeStatusFilterOptions}
          onValueChange={(value) =>
            setStatusFilter(value as EmployeeStatusFilter)
          }
        />

        <EmployeeFilterSelect
          value={riskFilter}
          label="Риск"
          groupLabel="Риски"
          options={employeeRiskFilterOptions}
          onValueChange={(value) => setRiskFilter(value as EmployeeRiskFilter)}
        />

        <Button
          type="button"
          variant="outline"
          className="rounded-xs bg-background xl:ml-auto"
          onClick={resetFilters}
        >
          <RotateCcw className="size-4" />
          Сбросить
        </Button>
      </div>

      <div className="min-h-0 flex-1">
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
            {filteredEmployees.map((row) => {
              const statusMeta = employeeStatusMeta[row.status];
              const workFormatMeta = employeeWorkFormatMeta[row.workFormat];

              return (
                <TableRow key={row.employee.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={row.employee.avatarUrl} />
                      <AvatarFallback>
                        {getEmployeeInitials(row.employee.fullName)}
                      </AvatarFallback>
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
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="h-12 text-center text-muted-foreground"
                >
                  Сотрудники не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeesTable;
