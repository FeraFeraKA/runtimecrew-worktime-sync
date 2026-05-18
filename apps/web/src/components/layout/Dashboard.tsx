import { ArrowUp, ChartBar } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="grid lg:grid-cols-9 lg:grid-rows-6 flex-1 gap-4">
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-between flex-1 p-3">
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
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-between flex-1 p-3">
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
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-between flex-1 p-3">
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
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-between flex-1 p-3">
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
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-between flex-1 p-3">
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
      <div className="lg:col-span-3 lg:row-span-1 bg-sidebar border flex flex-col justify-between flex-1 p-3">
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
      <div className="lg:col-span-6 lg:row-span-4 bg-sidebar border flex-1"></div>
      <div className="lg:col-span-3 lg:row-span-2 bg-sidebar border flex-1"></div>
      <div className="lg:col-span-3 lg:row-span-2 bg-sidebar border flex-1"></div>
    </section>
  );
};

export default Dashboard;
