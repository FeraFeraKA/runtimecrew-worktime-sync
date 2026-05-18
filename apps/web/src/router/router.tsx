import App from "@/App";
import Dashboard from "@/components/layout/Dashboard";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
    ],
  },
]);
