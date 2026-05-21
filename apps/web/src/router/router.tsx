import App from "@/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import EmployeeProfilePage from "@/pages/EmployeeProfilePage";
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
      {
        path: "/employee-profile",
        handle: pageHandles.employeeProfile,
        Component: EmployeeProfilePage,
      },
    ],
  },
]);
