import App from "@/AppLayout";
import AvailabilityPage from "@/pages/AvailabilityPage";
import ConflictsPage from "@/pages/ConflictsPage";
import DashboardPage from "@/pages/DashboardPage";
import EmployeeProfilePage from "@/pages/EmployeeProfilePage";
import EmployeesPage from "@/pages/EmployeesPage";
import StartPage from "@/pages/StartPage";
import { pageHandles } from "@/router/page.meta";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: StartPage,
  },
  {
    Component: App,
    children: [
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
      {
        path: "/employees/:employeeId/profile",
        handle: pageHandles.employeeProfile,
        Component: EmployeeProfilePage,
      },
      {
        path: "/availability",
        handle: pageHandles.availability,
        Component: AvailabilityPage,
      },
      {
        path: "/team-availability",
        handle: pageHandles.availability,
        Component: AvailabilityPage,
      },
      {
        path: "/conflicts",
        handle: pageHandles.conflicts,
        Component: ConflictsPage,
      },
    ],
  },
]);
