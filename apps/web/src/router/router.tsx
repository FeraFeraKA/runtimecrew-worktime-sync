import App from "@/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import EmployeesPage from "@/pages/EmployeesPage";
import { pageHandles } from "@/router/page.meta";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        index: true,
        handle: pageHandles.dashboard,
        Component: DashboardPage,
      },
      {
        path: "/dashboard",
        handle: pageHandles.dashboard,
        Component: DashboardPage,
      },
      {
        path: "/employees",
        handle: pageHandles.employees,
        Component: EmployeesPage,
      },
    ],
  },
]);
