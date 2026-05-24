import { cn, getEmployeeInitials } from "@/lib/utils";
import {
  conflictAllFilterOption,
  conflictSeverityFilterOptions,
  conflictSeverityMeta,
  conflictStatusFilterOptions,
  conflictStatusMeta,
  conflictTypeFilterOptions,
  conflictTypeMeta,
} from "@/shared/types/conflicts/conflicts.meta";
import type {
  ConflictSeverityFilter,
  ConflictStatusFilter,
  ConflictTableRowDto,
  ConflictTypeFilter,
} from "@/shared/types/conflicts/conflicts.types";
import { RotateCcw, Search } from "lucide-react";
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
import FilterSelect from "../FilterSelect";

interface IConflictsTableProps {
  conflicts: ConflictTableRowDto[];
}

const ConflictsTable = ({ conflicts }: IConflictsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ConflictTypeFilter>(
    conflictAllFilterOption.value,
  );
  const [severityFilter, setSeverityFilter] = useState<ConflictSeverityFilter>(
    conflictAllFilterOption.value,
  );
  const [statusFilter, setStatusFilter] = useState<ConflictStatusFilter>(
    conflictAllFilterOption.value,
  );

  const filteredConflicts = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase("ru-RU");

    return conflicts.filter((row) => {
      const matchesSearch =
        normalizedSearchQuery.length === 0 ||
        [
          row.typeLabel,
          row.severityLabel,
          row.employee.fullName,
          row.event,
          row.dateLabel,
          row.description,
          row.recommendation,
          row.statusLabel,
        ]
          .join(" ")
          .toLocaleLowerCase("ru-RU")
          .includes(normalizedSearchQuery);

      return (
        matchesSearch &&
        (typeFilter === conflictAllFilterOption.value ||
          row.type === typeFilter) &&
        (severityFilter === conflictAllFilterOption.value ||
          row.severity === severityFilter) &&
        (statusFilter === conflictAllFilterOption.value ||
          row.status === statusFilter)
      );
    });
  }, [conflicts, searchQuery, severityFilter, statusFilter, typeFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setTypeFilter(conflictAllFilterOption.value);
    setSeverityFilter(conflictAllFilterOption.value);
    setStatusFilter(conflictAllFilterOption.value);
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-col overflow-hidden border bg-sidebar xl:col-span-5 xl:row-span-5">
      <div className="flex shrink-0 flex-col gap-3 border-b p-2 xl:flex-row xl:items-center">
        <div className="flex h-8 min-w-0 shrink-0 overflow-hidden rounded-xs border bg-background xl:w-40 2xl:w-60">
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

        <FilterSelect
          value={typeFilter}
          label="Тип"
          groupLabel="Типы"
          options={conflictTypeFilterOptions}
          onValueChange={(value) => setTypeFilter(value as ConflictTypeFilter)}
        />

        <FilterSelect
          value={severityFilter}
          label="Риск"
          groupLabel="Риски"
          options={conflictSeverityFilterOptions}
          onValueChange={(value) =>
            setSeverityFilter(value as ConflictSeverityFilter)
          }
        />

        <FilterSelect
          value={statusFilter}
          label="Статус"
          groupLabel="Статусы"
          options={conflictStatusFilterOptions}
          onValueChange={(value) =>
            setStatusFilter(value as ConflictStatusFilter)
          }
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

      <div className="min-h-80 flex-1 overflow-hidden">
        <Table className="min-w-[1120px]">
          <TableHeader>
            <TableRow>
              <TableHead>Тип</TableHead>
              <TableHead>Риск</TableHead>
              <TableHead>Сотрудник</TableHead>
              <TableHead>Событие</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Рекомендация</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConflicts.map((row) => {
              const typeMeta = conflictTypeMeta[row.type];
              const severityMeta = conflictSeverityMeta[row.severity];
              const statusMeta = conflictStatusMeta[row.status];

              return (
                <TableRow key={row.id}>
                  <TableCell className="max-w-40">
                    <span
                      className={cn(
                        "font-medium leading-snug whitespace-normal",
                        getTextColorClassName(typeMeta.badgeClassName),
                      )}
                    >
                      {row.typeLabel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-transparent",
                        severityMeta.badgeClassName,
                      )}
                    >
                      {row.severityLabel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarImage src={row.employee.avatarUrl} />
                        <AvatarFallback>
                          {getEmployeeInitials(row.employee.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{row.employee.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{row.event}</TableCell>
                  <TableCell>{row.dateLabel}</TableCell>
                  <TableCell className="max-w-56 whitespace-normal leading-snug">
                    {row.description}
                  </TableCell>
                  <TableCell className="max-w-48 whitespace-normal leading-snug">
                    {row.recommendation}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-transparent",
                        statusMeta.badgeClassName,
                      )}
                    >
                      {row.statusLabel}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredConflicts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-12 text-center text-muted-foreground"
                >
                  Конфликты не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

function getTextColorClassName(className: string) {
  return className.split(" ").find((item) => item.startsWith("text-"));
}

export default ConflictsTable;
