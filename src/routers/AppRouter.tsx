import { Navigate, useRoutes } from "react-router-dom";
import NotFound from "../pages/errors/404";
import auth0Routers from "./admin/auth0-routers";
import managementRouters from "./admin/management-routers";
import masterRouters from "./admin/master-routers";
import ordersReportsRouters from "./admin/orders-reports-routers";
import ordersRouters from "./admin/orders-routers";
import AdminProtectedRoute from "./AdminProtectedRoute";
import PublicRouter from "./PublicRouter";
import Login from "../pages/auth/Login";
import ChangePassword from "../pages/admin/user/ChangePassword";
import { DashboardLayout } from "../components/layout";
import Dashboard from "../pages/admin/Dashboard";

export default function AppRouter() {
  return useRoutes([
    {
      path: "/",
      element: (
        <AdminProtectedRoute>
          <DashboardLayout />
        </AdminProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to={"/dashboard"} replace />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        auth0Routers,
        managementRouters,
        masterRouters,
        ordersReportsRouters,
        ordersRouters,
      ],
    },
    {
      path: "/auth/login",
      element: (
        <PublicRouter>
          <Login />
        </PublicRouter>
      ),
    },
    {
      path: "user/change-password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
}
