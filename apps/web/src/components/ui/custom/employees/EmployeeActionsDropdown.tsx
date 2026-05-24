import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";

const employeeActionItems = [
  "Профиль",
  "Запросить обновления графика",
  "Добавить причину отсутствия",
  "Подтвердить актуальность",
  "Посмотреть конфликты",
];

interface IEmployeeActionsDropdownProps {
  employeeId: string;
}

const EmployeeActionsDropdown = ({ employeeId }: IEmployeeActionsDropdownProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex items-center justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Открыть действия"
          className="mx-auto"
        >
          <EllipsisVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xs px-3 pb-0.5">
        <DropdownMenuLabel className="p-0 py-2 text-sm font-semibold text-foreground">
          Действия
        </DropdownMenuLabel>
        {employeeActionItems.map((action) => (
          <DropdownMenuItem
            key={action}
            className="rounded-xs px-0 py-1.5 whitespace-normal"
            onSelect={() => {
              if (action === "Профиль") {
                navigate(`/employees/${employeeId}/profile`);
              }
            }}
          >
            {action}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmployeeActionsDropdown;
