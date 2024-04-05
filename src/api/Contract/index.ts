import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";
import { ContractListByCustomerId } from "./type";

const ContractAPI = {
  getAllContracts: (params?: ContractListByCustomerId) =>
    axiosClient.get(END_POINTS_API.CONTRACTS),
};

export default ContractAPI;
