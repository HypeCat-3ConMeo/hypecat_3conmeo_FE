import { Dashboard as DashboardIcon } from "@mui/icons-material";

import config from "../../../../configs";
import { type MenuItemLayout } from "../../../../types/menu";

export const menuItems: MenuItemLayout[] = [
  {
    role: "Admin",
    menu: [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        path: config.customerRoutes.test,
      },
    ],
  },
];
