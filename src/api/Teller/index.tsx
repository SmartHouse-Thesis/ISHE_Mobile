import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

export const TellerAPI = {
  GetTellerList: () => axiosClient.get(END_POINTS_API.TELLER),
};

export default TellerAPI;
