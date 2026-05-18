import { ArrowRightIcon, ArrowUp, ChartBar, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Dashboard = () => {
  return (
    <section className="grid min-h-0 min-w-0 flex-1 overflow-hidden gap-4 lg:grid-cols-9 lg:grid-rows-6">
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2">
        <div className="flex items-center justify-between">
          <span>Актуальность команды</span>
          <ChartBar />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-blue-600 text-3xl">69%</span>
          <span className="flex">
            <ArrowUp /> 6% по ср. с 17 Мая - 30 Мая
          </span>
        </div>
      </div>
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2">
        <div className="flex items-center justify-between">
          <span>Актуальность команды</span>
          <ChartBar />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-blue-600 text-3xl">69%</span>
          <span className="flex">
            <ArrowUp /> 6% по ср. с 17 Мая - 30 Мая
          </span>
        </div>
      </div>
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2">
        <div className="flex items-center justify-between">
          <span>Актуальность команды</span>
          <ChartBar />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-blue-600 text-3xl">69%</span>
          <span className="flex">
            <ArrowUp /> 6% по ср. с 17 Мая - 30 Мая
          </span>
        </div>
      </div>
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2">
        <div className="flex items-center justify-between">
          <span>Актуальность команды</span>
          <ChartBar />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-blue-600 text-3xl">69%</span>
          <span className="flex">
            <ArrowUp /> 6% по ср. с 17 Мая - 30 Мая
          </span>
        </div>
      </div>
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2">
        <div className="flex items-center justify-between">
          <span>Актуальность команды</span>
          <ChartBar />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-blue-600 text-3xl">69%</span>
          <span className="flex">
            <ArrowUp /> 6% по ср. с 17 Мая - 30 Мая
          </span>
        </div>
      </div>
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-center flex-1 p-3 gap-2">
        <div className="flex items-center justify-between">
          <span>Актуальность команды</span>
          <ChartBar />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-blue-600 text-3xl">69%</span>
          <span className="flex">
            <ArrowUp /> 6% по ср. с 17 Мая - 30 Мая
          </span>
        </div>
      </div>
      <div className="min-w-0 min-h-0 max-h-screen lg:max-h-none overflow-hidden lg:col-span-6 lg:row-span-4 bg-sidebar border flex flex-col">
        <span className="shrink-0 text-center mt-3 mb-1">
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
              {Array.from({ length: 25 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>Иван Петров</span>
                  </TableCell>
                  <TableCell>Бэкенд-инженер</TableCell>
                  <TableCell>UTC+3</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-blue-200 text-blue-600"
                    >
                      Удалённо
                    </Badge>
                  </TableCell>
                  <TableCell className="text-red-600 font-bold">52%</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-red-200 text-red-600"
                    >
                      Критический
                    </Badge>
                  </TableCell>
                  <TableCell>37% встреч вне графика</TableCell>
                  <TableCell>Попросить обновить график</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="lg:col-span-3 lg:row-span-2 bg-sidebar border flex flex-col flex-1 p-3 gap-3.5">
        <span className="text-xl font-bold">Топ рекомендаций</span>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items-center gap-2">
          <div className="flex items-center gap-4">
            <User className="border p-1" size={40} />
            <Badge variant="outline" className="bg-red-200 text-red-600 p-3">
              Критический
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span>Попросить Ивана обновить график</span>
            <ArrowRightIcon className="justify-self-end" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 lg:row-span-2 bg-sidebar border flex-1"></div>
    </section>
  );
};

export default Dashboard;
