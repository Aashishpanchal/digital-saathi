import Packages from "../../pages/admin/master/packages";
import Units from "../../pages/admin/master/units";
import Areas from "../../pages/admin/master/areas";
import Banner from "../../pages/admin/master/banner";
import Reason from "../../pages/admin/master/reason";
import PrimaryRetailer from "../../pages/admin/master/primary-retailers";

export default {
  path: "/masters",
  children: [
    {
      path: "packages",
      element: <Packages />,
    },
    {
      path: "units",
      element: <Units />,
    },
    {
      path: "areas",
      children: [
        {
          path: "",
          element: <Areas />,
        },
        {
          path: ":area_id/primary-retailer",
          element: <PrimaryRetailer />,
        },
      ],
    },
    {
      path: "banner",
      element: <Banner />,
    },
    {
      path: "reason",
      element: <Reason />,
    },
  ],
};
