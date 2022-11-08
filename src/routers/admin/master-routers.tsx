import Packages from "../../pages/admin/master/packages";
import Units from "../../pages/admin/master/units";
import Areas from "../../pages/admin/master/areas";
import Banner from "../../pages/admin/master/banner";
import Reason from "../../pages/admin/master/reason";

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
      element: <Areas />,
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
