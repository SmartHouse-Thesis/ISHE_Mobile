import { CreateFeedbackTypes, UpdateFeedbackTypes } from "../../types/Feedback";
import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

const FeedbackAPI = {
  CreateFeedback: (params: CreateFeedbackTypes) =>
    axiosClient.post(END_POINTS_API.FEEDBACK, params),
  UpdateFeedback: (params: UpdateFeedbackTypes) =>
    axiosClient.put(`${END_POINTS_API.FEEDBACK}/${params.id}`, params),
};

export default FeedbackAPI;
