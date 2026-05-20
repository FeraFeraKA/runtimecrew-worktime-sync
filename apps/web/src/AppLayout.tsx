import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import Header from "./components/layout/Header";
import AppSidebar from "./components/layout/Sidebar";

const AppLayout = () => {
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);
  const [period, setPeriod] = useState<DateRange | undefined>();

  const handleCurrentTeamChange = (team: string) => {
    setCurrentTeam(team);
  };

  const handlePeriodChange = (range: DateRange | undefined) => {
    setPeriod(range);
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="xl:h-svh min-h-0 overflow-hidden">
        <Header
          currentTeam={currentTeam}
          period={period}
          onCurrentTeamChange={handleCurrentTeamChange}
          onPeriodChange={handlePeriodChange}
        />
        <main className="flex flex-col flex-1 min-h-0 min-w-0 overflow-hidden p-4">
          <Outlet
            context={{
              currentTeam,
              period,
            }}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
