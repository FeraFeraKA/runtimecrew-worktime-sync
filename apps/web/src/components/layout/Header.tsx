import { getPageTitleFromMatches } from "@/router/page.meta";
import { TEAM_OPTIONS } from "@/shared/config/defaults";
import { Bell } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useMatches } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
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

interface IHeaderProps {
  currentTeam: string | null;
  period: DateRange | undefined;
  onCurrentTeamChange: (team: string) => void;
  onPeriodChange: (range: DateRange | undefined) => void;
}

const Header = ({
  currentTeam,
  period,
  onCurrentTeamChange,
  onPeriodChange,
}: IHeaderProps) => {
  const matches = useMatches();
  const pageTitle = getPageTitleFromMatches(matches);

  return (
    <>
      <header className="flex flex-col lg:flex-row items-center justify-between lg:h-16 p-4 gap-4 border-b bg-sidebar shrink-0">
        <div className="flex min-w-0 items-center gap-4 self-stretch lg:self-auto">
          <SidebarTrigger />
          <h1 className="truncate text-2xl font-bold">{pageTitle}</h1>
        </div>
        <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row lg:items-center">
          <DatePickerWithRange value={period} onChange={onPeriodChange} />
          <div className="flex flex-row gap-4">
            <Select
              value={currentTeam ?? undefined}
              onValueChange={(value) => onCurrentTeamChange(value)}
            >
              <SelectTrigger className="w-full rounded-xs bg-background lg:w-65">
                <SelectValue placeholder="Команда..." />
              </SelectTrigger>
              <SelectContent className="rounded-xs">
                <SelectGroup>
                  <SelectLabel>Команды</SelectLabel>
                  {TEAM_OPTIONS.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-xs bg-background"
                >
                  <Bell />
                </Button>
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
        </div>
      </header>
    </>
  );
};

export default Header;
