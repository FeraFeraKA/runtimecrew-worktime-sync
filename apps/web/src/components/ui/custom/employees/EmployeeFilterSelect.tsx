import type { EmployeeFilterOption } from "@/shared/types/employees/employees.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../select";

interface IEmployeeFilterSelectProps<TValue extends string> {
  value: TValue;
  label: string;
  groupLabel: string;
  options: EmployeeFilterOption<TValue>[];
  onValueChange: (value: TValue) => void;
}

const EmployeeFilterSelect = <TValue extends string>({
  value,
  label,
  groupLabel,
  options,
  onValueChange,
}: IEmployeeFilterSelectProps<TValue>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-8 w-full rounded-xs bg-background xl:w-60 xl:min-w-20">
        <SelectValue>{`${label}: ${selectedOption?.label ?? "Все"}`}</SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-xs">
        <SelectGroup>
          <SelectLabel>{groupLabel}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default EmployeeFilterSelect;
