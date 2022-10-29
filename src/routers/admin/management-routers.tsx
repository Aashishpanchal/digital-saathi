import Farmers from "../../pages/admin/management/farmers/Farmers";
import {
  Categories,
  SubCategories,
} from "../../pages/admin/management/categories";
import { Brands } from "../../pages/admin/management/brands";
import {
  CreateDeliveryPartner,
  DeliveryAgents,
  DeliveryPartners,
  DeliveryPartnersRetailer,
  RetrieveUpdateDeliveryPartner,
} from "../../pages/admin/management/delivery-partners";
import {
  CreateProducts,
  ImportCsvProducts,
  Products,
  RetrieveUpdateProduct,
  ShopProductDetails,
} from "../../pages/admin/management/products";
import {
  CreateRetailers,
  RetailerDashboard,
  Retailers,
  RetrieveUpdateRetailers,
} from "../../pages/admin/management/retailers";
import {
  RetailerOrderCancelled,
  RetailerOrders,
  RetailerSaleDetails,
  RetailerSkuPricing,
  RetailerSkuUnits,
  RetailerTargetAchievement,
} from "../../pages/admin/management/retailers/retailerDashboard";
import ProductImages from "../../pages/admin/management/products/product-images";
import FarmersOrders from "../../pages/admin/management/farmers/farmers-orders";

export default {
  path: "/management",
  children: [
    {
      path: "farmers",
      children: [
        {
          path: "",
          element: <Farmers />,
        },
        {
          path: ":customer_id",
          element: <FarmersOrders />,
        },
      ],
    },
    {
      path: "retailers",
      children: [
        {
          path: "",
          element: <Retailers />,
        },
        {
          path: "new",
          element: <CreateRetailers />,
        },
        {
          path: ":retailer_id",
          element: <RetrieveUpdateRetailers />,
        },
        {
          path: ":retailer_id/retailer-dashboard",
          children: [
            {
              path: "",
              element: <RetailerDashboard />,
            },
            {
              path: "retailer-orders",
              element: <RetailerOrders />,
            },
            {
              path: "retailer-sku-units",
              element: <RetailerSkuUnits />,
            },
            {
              path: "retailer-sku-pricing",
              element: <RetailerSkuPricing />,
            },
            {
              path: "retailer-input-sale-details",
              element: <RetailerSaleDetails />,
            },
            {
              path: "retailer-cancelled-orders",
              element: <RetailerOrderCancelled />,
            },
            {
              path: "retailer-target-achievement",
              element: <RetailerTargetAchievement />,
            },
          ],
        },
      ],
    },
    {
      path: "categories",
      children: [
        {
          path: "",
          element: <Categories />,
        },
        {
          path: ":parent_category_id/sub-categories",
          element: <SubCategories />,
        },
      ],
    },
    {
      path: "brands",
      children: [
        {
          path: "",
          element: <Brands />,
        },
      ],
    },
    {
      path: "delivery-partners",
      children: [
        {
          path: "",
          element: <DeliveryPartners />,
        },
        {
          path: "new",
          element: <CreateDeliveryPartner />,
        },
        {
          path: ":partner_id",
          children: [
            {
              path: "",
              element: <RetrieveUpdateDeliveryPartner />,
            },
            {
              path: "dp-retailer",
              element: <DeliveryPartnersRetailer />,
            },
            {
              path: "dp-agents",
              element: <DeliveryAgents />,
            },
          ],
        },
      ],
    },
    {
      path: "products",
      children: [
        {
          path: "",
          element: <Products />,
        },
        {
          path: "new",
          element: <CreateProducts />,
        },
        {
          path: "product-import-export",
          children: [
            {
              path: "",
              element: <ImportCsvProducts />,
            },
          ],
        },
        {
          path: ":sku_id",
          children: [
            {
              path: "",
              element: <RetrieveUpdateProduct />,
            },
            {
              path: "product-more-images",
              element: <ProductImages />,
            },
            {
              path: "product-details",
              element: <ShopProductDetails />,
            },
          ],
        },
      ],
    },
  ],
};
