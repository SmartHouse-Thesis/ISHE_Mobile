import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";
import { LoginAccountTypes } from "./type";

const AuthenticationAPI = {
  LoginAccount: (params: LoginAccountTypes) =>
    axiosClient.post(END_POINTS_API.SIGN_IN, params),
  GetAccountLogin: () => axiosClient.get(END_POINTS_API.SIGN_IN),
};

export default AuthenticationAPI;
