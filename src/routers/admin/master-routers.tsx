import Packages from "../../pages/admin/master/packages";
import Units from "../../pages/admin/master/units";
import Areas from "../../pages/admin/master/areas";

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
  ],
};
