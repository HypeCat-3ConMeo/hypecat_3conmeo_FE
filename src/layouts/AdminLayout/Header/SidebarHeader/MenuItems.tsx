import { Dashboard as DashboardIcon } from "@mui/icons-material";

import config from "../../../../configs";
import { type MenuItemLayout } from "../../../../types/menu";
import Iconify from "../../../../components/Iconify";

export const menuItems: MenuItemLayout[] = [
  {
    role: "Admin",
    menu: [
      {
        icon: <DashboardIcon />,
        label: "Bảng Thống Kê",
        path: config.adminRoutes.dashboard,
      },
      {
        icon: (
          <Iconify icon="mdi:package-variant-closed" width={24} height={24} />
        ),
        label: "Sản Phẩm",
        path: config.adminRoutes.manageProduct,
      },
      {
        icon: <Iconify icon="mdi:shape-outline" width={24} height={24} />,
        label: "Loại Sản Phẩm",
        path: config.adminRoutes.manageCategory,
      },
      {
        icon: <Iconify icon="mdi:truck-delivery" width={24} height={24} />,
        label: "Lô Hàng",
        path: config.adminRoutes.manageBatch,
      },
      {
        icon: <Iconify icon="mdi:tray-arrow-down" width={24} height={24} />,
        label: "Nhập hàng",
        path: config.adminRoutes.importBatch,
      },
    ],
  },
];
