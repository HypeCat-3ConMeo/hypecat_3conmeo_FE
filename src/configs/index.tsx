import { MessageNotice, AdminMessageNotice } from "./message";
import { managerRoutes, adminRoutes, authRoutes, staffRoutes } from "./routes";

const config = {
  authRoutes,
  managerRoutes,
  adminRoutes,
  staffRoutes,
  MessageNotice,
  AdminMessageNotice,
};

export default config;
