import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { pageHandles } from "@/router/page.meta";
import {
  Calendar,
  LayoutDashboard,
  TriangleAlert,
  User,
  Users,
} from "lucide-react";
import { NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const pages = [
  { title: pageHandles.dashboard.title, path: "/", icon: LayoutDashboard },
  { title: pageHandles.employees.title, path: "/employees", icon: Users },
  {
    title: "Профиль сотрудника",
    path: "/employee-profile",
    icon: User,
  },
  {
    title: "Доступность команд",
    path: "/team-availability",
    icon: Calendar,
  },
  { title: "Конфликты", path: "/conflicts", icon: TriangleAlert },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="px-4">
        <div className="flex items-center">
          <NavLink to="/">
            <img src="/favicon.svg" alt="Logo" />
          </NavLink>
          <span className="ml-2 text-xl font-semibold">WorkTime Sync</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="flex gap-4 mt-4">
            {pages.map((page) => {
              const Icon = page.icon;

              return (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={page.path}>
                      <Icon className="size-6" />
                      <span>{page.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm">Александр Фёдоров</span>
            <span className="text-sm">alfedorod@outlook.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
