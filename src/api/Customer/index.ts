import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";
import { SignUpCustomerAccountTypes } from "./type";

export const CustomerAPI = {
  SignUpAccount: (params: SignUpCustomerAccountTypes) =>
    axiosClient.post(END_POINTS_API.CUSTOMER_ROLE.SIGN_UP, params),
};

export default CustomerAPI;
