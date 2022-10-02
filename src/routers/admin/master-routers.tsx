import {
  CreatePackage,
  Packages,
  RetrieveUpdatePackage,
} from "../../pages/admin/master/packages";
import {
  CreateUnit,
  RetrieveUpdateUnit,
  Units,
} from "../../pages/admin/master/units";
import { Areas, CreateArea } from "../../pages/admin/master/areas";
import RetrieveUpdateArea from "../../pages/admin/master/areas/RetrieveUpdateArea";

export default {
  path: "/masters",
  children: [
    {
      path: "packages",
      children: [
        {
          path: "",
          element: <Packages />,
        },
        {
          path: "new",
          element: <CreatePackage />,
        },
        {
          path: ":package_id",
          element: <RetrieveUpdatePackage />,
        },
      ],
    },
    {
      path: "units",
      children: [
        {
          path: "",
          element: <Units />,
        },
        {
          path: "new",
          element: <CreateUnit />,
        },
        {
          path: ":units_id",
          element: <RetrieveUpdateUnit />,
        },
      ],
    },
    {
      path: "areas",
      children: [
        {
          path: "",
          element: <Areas />,
        },
        {
          path: "new",
          element: <CreateArea />,
        },
        {
          path: ":area_id",
          element: <RetrieveUpdateArea />,
        },
      ],
    },
  ],
};
