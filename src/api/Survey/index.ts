import { CreateNewSurveyTypes, SurveyFilterTypes } from "../../types/Survey";
import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

const SurveyRequestAPI = {
  CreateNewSurvey: (params: CreateNewSurveyTypes) =>
    axiosClient.post(END_POINTS_API.SURVEY, params),
  GetSurveyList: (params: SurveyFilterTypes) =>
    axiosClient.get(
      `${END_POINTS_API.SURVEY}/?customerId=${params.customerId}`
    ),
};

export default SurveyRequestAPI;
