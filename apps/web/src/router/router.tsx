import App from "@/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import EmployeesPage from "@/pages/EmployeesPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
      {
        path: "/employees",
        Component: EmployeesPage,
      },
    ],
  },
]);
