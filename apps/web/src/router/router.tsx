import App from "@/App";
import DashboardPage from "@/pages/DashboardPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
    ],
  },
]);
