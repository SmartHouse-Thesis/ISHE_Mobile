import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";
import { ContractListByCustomerId, CreateContractModifyRequest, UpdateContractTypes } from "./type";

const ContractAPI = {
  getAllContracts: (params?: ContractListByCustomerId) =>
    axiosClient.get(END_POINTS_API.CONTRACTS, {
      params,
    }),
  updateContract: (params: UpdateContractTypes) => {
    const { id, ...rest } = params;
    return axiosClient.put(`${END_POINTS_API.CONTRACTS}/${id}`, rest);
  },

  uploadContractImage: (params: { id: string; formData: FormData }) => {
    return axiosClient.put(`${END_POINTS_API.CONTRACT_IMAGE}/${params.id}`, params.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  uploadContractAcceptance: (params: { id: string; formData: FormData }) => {
    return axiosClient.put(`${END_POINTS_API.CONTRACT_ACCEPTANCE}/${params.id}`, params.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  createContractModify: (params: CreateContractModifyRequest) => axiosClient.post(END_POINTS_API.CONTRACT_REQUEST, params),
};

export default ContractAPI;
