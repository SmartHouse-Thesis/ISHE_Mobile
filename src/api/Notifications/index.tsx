import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

const NotificationAPI = {
  sendDeviceToken: (params: { deviceToken: string }) => axiosClient.post(END_POINTS_API.DEVICE_TOKENS, params),
  getNotifications: (params: { pageNumber: number; pageSize: number }) => axiosClient.get(END_POINTS_API.NOTIFICATIONS, { params }),
};

export default NotificationAPI;
