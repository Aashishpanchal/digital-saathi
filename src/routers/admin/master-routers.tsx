import Packages from "../../pages/admin/master/packages";
import Units from "../../pages/admin/master/units";
import { Areas, PrimaryAreas } from "../../pages/admin/master/area";
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
      children: [
        {
          path: "",
          element: <Areas />,
        },
        {
          path: ":area_id/primary-areas",
          element: <PrimaryAreas />,
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
