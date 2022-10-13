import { Auth0UserInFormation, Auth0Users } from "../../pages/admin/auth0";

export default {
  path: "/auth0-users",
  children: [
    {
      path: "",
      element: <Auth0Users />,
    },
    {
      path: ":auth0_id",
      element: <Auth0UserInFormation />,
    },
  ],
};
