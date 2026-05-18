import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DatePickerWithRange } from "../ui/datepicker";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <>
      <header className="flex flex-col lg:flex-row items-center justify-between lg:h-16 p-4 gap-4 border-b bg-sidebar">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Дашборд</h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <DatePickerWithRange />
          <Select>
            <SelectTrigger className="rounded-xs w-65 bg-background">
              <SelectValue placeholder="Команда..." />
            </SelectTrigger>
            <SelectContent className="rounded-xs">
              <SelectGroup>
                <SelectLabel>Команды</SelectLabel>
                <SelectItem value="product-team">
                  Продуктовая команда
                </SelectItem>
                <SelectItem value="research-team">
                  Исследовательская команда
                </SelectItem>
                <SelectItem value="analytic-team">
                  Аналитическая команда
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Bell />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Уведомления</PopoverTitle>
                <PopoverDescription>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">
                        Иван Иванов
                      </span>
                    </div>
                    <span>Имеются подозрения на конфликт часовых поясов</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">
                        Иван Иванов
                      </span>
                    </div>
                    <span>Имеются подозрения на конфликт часовых поясов</span>
                  </div>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </>
  );
};

export default Header;
