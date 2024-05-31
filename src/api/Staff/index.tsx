import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

export const StaffAPI = {
  GetStaffList: () => axiosClient.get(END_POINTS_API.STAFF),
};

export default StaffAPI;
