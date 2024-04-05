import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

const DevicePackagesAPI = {
  getAllDevicePackages: () => axiosClient.get(END_POINTS_API.PACKAGES.GET_ALL),
  getDeviceByPackageId: (packageId: string) =>
    axiosClient.get(`${END_POINTS_API.PACKAGES.GET_ALL}/${packageId}`),
};

export default DevicePackagesAPI;
