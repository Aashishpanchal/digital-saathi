import React from "react";
import { useRoutes } from "react-router-dom";
import ChangePassword from "../pages/home/user/ChangePassword";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/home/Dashboard";
import AdminProtectedRoute from "./AdminProtectedRoute";
import PublicRouter from "./PublicRouter";
import Farmers from "../pages/home/management/farmers/Farmers";
import Retailers from "../pages/home/management/retailers/Retailers";
import RetrieveUpdate from "../pages/home/management/farmers/RetrieveUpdate";
import {
  Categories,
  CreateCategories,
  RetrieveUpdateCategories,
} from "../pages/home/management/categories";
import CreateRetailers from "../pages/home/management/retailers/CreateRetailers";
import RetrieveUpdateRetailers from "../pages/home/management/retailers/RetrieveUpdateRetailers";
import {
  Brands,
  CreateBrands,
  RetrieveUpdateBrands,
} from "../pages/home/management/brands";
import {
  CreateDeliveryPartner,
  DeliveryPartners,
  DeliveryPartnersRetailer,
  RetrieveUpdateDeliveryPartner,
} from "../pages/home/management/delivery-partners";

export default function AppRouter() {
  const Element = useRoutes([
    {
      path: "/",
      element: (
        <AdminProtectedRoute>
          <Dashboard />
        </AdminProtectedRoute>
      ),
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
      element: (
        <AdminProtectedRoute>
          <ChangePassword />
        </AdminProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <div>Not Found...</div>,
    },
    {
      path: "/management",
      children: [
        {
          path: "farmers",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Farmers />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":farmer_id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdate />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "retailers",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Retailers />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <AdminProtectedRoute>
                  <CreateRetailers />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdateRetailers />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "categories",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Categories />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <AdminProtectedRoute>
                  <CreateCategories />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdateCategories />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "brands",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Brands />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <AdminProtectedRoute>
                  <CreateBrands />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdateBrands />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "delivery-partners",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <DeliveryPartners />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <AdminProtectedRoute>
                  <CreateDeliveryPartner />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdateDeliveryPartner />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "retailer/:id",
              element: (
                <AdminProtectedRoute>
                  <DeliveryPartnersRetailer />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return Element;
}
