import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./components/layout/Header";
import AppSidebar from "./components/layout/Sidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="xl:h-svh min-h-0 overflow-hidden">
        <Header />
        <main className="flex flex-col flex-1 min-h-0 min-w-0 overflow-hidden p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
