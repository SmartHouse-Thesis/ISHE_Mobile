import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

export enum ZaloPaymentTypes {
  Deposit = "Deposit",
  Completion = "Completion",
}

export type ZaloPaymentRequest = {
  contractId: string;
  typePayment: ZaloPaymentTypes;
};

const PaymentAPI = {
  getZaloPayment: (params: ZaloPaymentRequest) => axiosClient.post(END_POINTS_API.ZALO_PAY, params),
};

export default PaymentAPI;
