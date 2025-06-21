/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../../axiosInstance";
import { LOGIN } from "../../PathnameApi";

const authApi = {
  login: (body: any) => {
    return axiosClient.post(LOGIN, body);
  },
};

export default authApi;
