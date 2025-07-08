/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "../../../types/Usertype";
import axiosClient from "../../axiosInstance";
import { PROFILE, PROFILE_UPDATE } from "../../PathnameApi";

const userApi = {
  //GET api
  getListUsers: (params?: { pageIndex?: number; pageSize?: number }) => {
    const url = "/Users/GetUserPagination";
    return axiosClient.get(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },

  getUserByPhone: (params?: { phone: string }) => {
    const url = "/Users/GetCustomerInfoByPhone";
    return axiosClient.get(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },

  //Get profile
  getProfile: (params?: string): Promise<User> => {
    return axiosClient.get(PROFILE, {
      params,
      paramsSerializer: {
        indexes: null,
      },
    });
  },

  //POST api (multipart/form-data)
  createNewUser: (body: string) => {
    const url = "/Users/CreateUser";
    return axiosClient.post(url, body);
  },

  //POST api
  postSomeThingNor: (body: string) => {
    const url = "/api/v1/someThing";
    return axiosClient.post(url, body);
  },

  //PUT api
  updateProfile: (id: any, body: any): Promise<User> => {
    return axiosClient.put(`${PROFILE_UPDATE}/${id}`, body);
  },

  //DELETE api
  deleteSomeThing: (id: string) => {
    const url = `/api/v1/someThing/${id}`;
    return axiosClient.delete(url);
  },

  //PATCH api
  patchSomeThing: (id: string, body: string) => {
    const url = `/api/v1/someThing/${id}`;
    return axiosClient.patch(url, body);
  },
};

export default userApi;
