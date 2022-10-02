import { NewOrders } from "../../pages/admin/orders/new";
import { InProcessOrders } from "../../pages/admin/orders/in-process";
import { AcceptedOrders } from "../../pages/admin/orders/accepted";
import { OutForDeliveryOrders } from "../../pages/admin/orders/out-for-delivery";
import { DeliveredOrders } from "../../pages/admin/orders/delivered";
import { CancelledOrders } from "../../pages/admin/orders/cancelled";
import { ReturningOrders } from "../../pages/admin/orders/returning";
import { ReturnedOrders } from "../../pages/admin/orders/Returned";
import { OrderInvoicePrint } from "../../pages/admin/orders/order-invoice";
import OrderDetails from "../../pages/admin/orders/OrderDetails";

export default {
  path: "/orders",
  children: [
    {
      path: "new-orders",
      element: <NewOrders />,
    },
    {
      path: "order-invoice-print/:order_id",
      element: <OrderInvoicePrint />,
    },
    {
      path: "order-details/:order_id",
      element: <OrderDetails />,
    },
    {
      path: "orders-accepted",
      element: <AcceptedOrders />,
    },
    {
      path: "orders-in-progress",
      element: <InProcessOrders />,
    },
    {
      path: "orders-out-for-delivery",
      element: <OutForDeliveryOrders />,
    },
    {
      path: "orders-delivered",
      element: <DeliveredOrders />,
    },
    {
      path: "orders-cancelled",
      element: <CancelledOrders />,
    },
    {
      path: "orders-returning",
      element: <ReturningOrders />,
    },
    {
      path: "orders-returned",
      element: <ReturnedOrders />,
    },
  ],
};
