import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

type FilterOption<TValue extends string> = {
  value: TValue;
  label: string;
};

interface IFilterSelectProps<TValue extends string> {
  value: TValue;
  label: string;
  groupLabel: string;
  options: FilterOption<TValue>[];
  onValueChange: (value: TValue) => void;
}

const FilterSelect = <TValue extends string>({
  value,
  label,
  groupLabel,
  options,
  onValueChange,
}: IFilterSelectProps<TValue>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-8 w-full rounded-xs bg-background xl:w-60 xl:min-w-20">
        <SelectValue>
          <span className="block min-w-0 truncate">
            {`${label}: ${selectedOption?.label ?? "Все"}`}
          </span>
        </SelectValue>
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

export default FilterSelect;
