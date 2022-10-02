import Farmers from "../../pages/admin/management/farmers/Farmers";
import RetrieveUpdate from "../../pages/admin/management/farmers/RetrieveUpdate";
import {
  Categories,
  CreateCategories,
  CreateSubCategories,
  RetrieveUpdateCategories,
  RetrieveUpdateSubCategory,
  SubCategories,
} from "../../pages/admin/management/categories";
import {
  Brands,
  CreateBrands,
  RetrieveUpdateBrands,
} from "../../pages/admin/management/brands";
import {
  CreateDeliveryAgent,
  CreateDeliveryPartner,
  CreateDPRetailer,
  DeliveryAgents,
  DeliveryPartners,
  DeliveryPartnersRetailer,
  RetrieveUpdateDeliveryAgent,
  RetrieveUpdateDeliveryPartner,
  RetrieveUpdateDPRetailer,
} from "../../pages/admin/management/delivery-partners";
import {
  CreateProducts,
  CreateProductWeightPrice,
  ImportCsvProducts,
  Products,
  ProductWeightPrice,
  RetrieveUpdateProduct,
  RetrieveUpdateProductWeightPrice,
  ShopProductDetails,
  ShopProductMoreImages,
  ShopProductRetrieveUpdateImage,
  ShopProductUploadImage,
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
          path: ":farmer_id",
          element: <RetrieveUpdate />,
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
          path: ":retailer_id/retailer-dashboard/:retailer_name",
          children: [
            {
              path: "",
              element: <RetailerDashboard />,
            },
            {
              path: "retailer-orders",
              children: [
                {
                  path: "",
                  element: <RetailerOrders />,
                },
              ],
            },
            {
              path: "retailer-sku-units",
              children: [
                {
                  path: "",
                  element: <RetailerSkuUnits />,
                },
              ],
            },
            {
              path: "retailer-sku-pricing",
              children: [
                {
                  path: "",
                  element: <RetailerSkuPricing />,
                },
              ],
            },
            {
              path: "retailer-input-sale-details",
              children: [
                {
                  path: "",
                  element: <RetailerSaleDetails />,
                },
              ],
            },
            {
              path: "retailer-cancelled-orders",
              children: [
                {
                  path: "",
                  element: <RetailerOrderCancelled />,
                },
              ],
            },
            {
              path: "retailer-target-achievement",
              children: [
                {
                  path: "",
                  element: <RetailerTargetAchievement />,
                },
              ],
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
          path: "new",
          element: <CreateCategories />,
        },
        {
          path: ":id",
          element: <RetrieveUpdateCategories />,
        },
        {
          path: ":parent_category_id/sub-categories/:category_name",
          children: [
            {
              path: "",
              element: <SubCategories />,
            },
            {
              path: "new",
              element: <CreateSubCategories />,
            },
            {
              path: ":subcategory_id",
              element: <RetrieveUpdateSubCategory />,
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
          element: <Brands />,
        },
        {
          path: "new",
          element: <CreateBrands />,
        },
        {
          path: ":id",
          element: <RetrieveUpdateBrands />,
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
              path: "dp-retailer/:partner_name",
              children: [
                {
                  path: "",
                  element: <DeliveryPartnersRetailer />,
                },
                {
                  path: "new",
                  element: <CreateDPRetailer />,
                },
                {
                  path: ":del_ret_id",
                  element: <RetrieveUpdateDPRetailer />,
                },
              ],
            },
            {
              path: "dp-agents/:partner_name",
              children: [
                {
                  path: "",
                  element: <DeliveryAgents />,
                },
                {
                  path: "new",
                  element: <CreateDeliveryAgent />,
                },
                {
                  path: ":agent_id",
                  element: <RetrieveUpdateDeliveryAgent />,
                },
              ],
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
              path: "product-more-images/:sku_name",
              children: [
                {
                  path: "",
                  element: <ShopProductMoreImages />,
                },
                {
                  path: ":image_id",
                  element: <ShopProductRetrieveUpdateImage />,
                },
                {
                  path: "upload",
                  element: <ShopProductUploadImage />,
                },
              ],
            },
            {
              path: "product-details/:sku_name",
              element: <ShopProductDetails />,
            },
            {
              path: "product-weight-price/:sku_name",
              children: [
                {
                  path: "",
                  element: <ProductWeightPrice />,
                },
                {
                  path: "new",
                  element: <CreateProductWeightPrice />,
                },
                {
                  path: ":price_id",
                  element: <RetrieveUpdateProductWeightPrice />,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
