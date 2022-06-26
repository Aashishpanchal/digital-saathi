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
  SubCategories,
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
import {
  CreateProductWeightPrice,
  Products,
  ProductWeightPrice,
  RetrieveUpdateProduct,
  RetrieveUpdateProductWeightPrice,
} from "../pages/home/management/products";
import {
  CreatePackage,
  Packages,
  RetrieveUpdatePackage,
} from "../pages/home/master/packages";
import {
  CreateUnit,
  RetrieveUpdateUnit,
  Units,
} from "../pages/home/master/units";
import { Areas, CreateArea } from "../pages/home/master/areas";
import RetrieveUpdateArea from "../pages/home/master/areas/RetrieveUpdateArea";
import { AmountCollectionReport } from "../pages/home/reports/amount-collection-report";
import { NewOrders } from "../pages/home/orders/new";
import { InProcessOrders } from "../pages/home/orders/in-process";
import { AcceptedOrders } from "../pages/home/orders/accepted";
import { OutForDeliveryOrders } from "../pages/home/orders/out-for-delivery";
import { DeliveredOrders } from "../pages/home/orders/delivered";
import { CancelledOrders } from "../pages/home/orders/cancelled";
import { ReturningOrders } from "../pages/home/orders/returning";
import { ReturnedOrders } from "../pages/home/orders/Returned";

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
            {
              path: ":parent_category_id/sub-categories/:category_name",
              children: [
                {
                  path: "",
                  element: (
                    <AdminProtectedRoute>
                      <SubCategories />
                    </AdminProtectedRoute>
                  ),
                },
              ],
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
              path: ":id/retailer",
              element: (
                <AdminProtectedRoute>
                  <DeliveryPartnersRetailer />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "products",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Products />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdateProduct />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":sku_id/product-weight-price/:sku_name",
              children: [
                {
                  path: "",
                  element: (
                    <AdminProtectedRoute>
                      <ProductWeightPrice />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: "new",
                  element: (
                    <AdminProtectedRoute>
                      <CreateProductWeightPrice />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: ":price_id",
                  element: (
                    <AdminProtectedRoute>
                      <RetrieveUpdateProductWeightPrice />
                    </AdminProtectedRoute>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/masters",
      children: [
        {
          path: "packages",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Packages />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <AdminProtectedRoute>
                  <CreatePackage />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdatePackage />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "units",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Units />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <AdminProtectedRoute>
                  <CreateUnit />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdateUnit />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "areas",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <Areas />
                </AdminProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <AdminProtectedRoute>
                  <CreateArea />
                </AdminProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <AdminProtectedRoute>
                  <RetrieveUpdateArea />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/reports",
      children: [
        {
          path: "amount-collection-report",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <AmountCollectionReport />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/orders",
      children: [
        {
          path: "new-orders",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <NewOrders />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "orders-accepted",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <AcceptedOrders />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "orders-in-progress",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <InProcessOrders />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "orders-out-for-delivery",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <OutForDeliveryOrders />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "orders-delivered",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <DeliveredOrders />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "orders-cancelled",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <CancelledOrders />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "orders-returning",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <ReturningOrders />
                </AdminProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "orders-returned",
          children: [
            {
              path: "",
              element: (
                <AdminProtectedRoute>
                  <ReturnedOrders />
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
