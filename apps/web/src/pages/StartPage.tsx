import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const StartPage = () => {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-4">
      <section className="flex w-full max-w-2xl flex-col items-center text-center">
        <img src="/favicon.svg" alt="" className="mb-5 size-12" />
        <h1 className="text-4xl font-bold tracking-normal sm:text-5xl">
          WorkTime Sync
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Сервис для контроля актуальности рабочих графиков, конфликтов
          расписания и доступности команды.
        </p>

        <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xs"
            disabled
          >
            Зайти как сотрудник
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xs"
            disabled
          >
            Зайти как HR
          </Button>
          <Button asChild className="h-11 rounded-xs">
            <Link to="/dashboard">Зайти как руководитель</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default StartPage;
