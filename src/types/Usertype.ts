import type { Address } from "./AddressType";

interface Role {
  id: number;
  roleName: string;
}

interface Image {
  id?: number;
  urlPath: string;
}
interface UpdateImage {
  id?: number;
  userImages: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  addresses: Address[];
  status: "Active" | "Inactive" | string;
  role: Role;
  images: Image[];
  userImages: UpdateImage[];
}

// // Ví dụ sử dụng type alias (tương đương với interface trong trường hợp này)
// export type UserType = {
//   id: number;
//   name: string;
//   email: string;
//   password?: string;
//   phone: string;
//   address: string;
//   status: "Active" | "Inactive" | string;
//   role: Role;
//   images: Image[];
// };
