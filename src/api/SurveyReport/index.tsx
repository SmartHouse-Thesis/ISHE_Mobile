import {
  CreateNewSurveyReport,
  QuerySurveyReportParams,
  SurveyReportUpdate,
} from "../../types/SurveyReport";
import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";

const SurveyReportAPI = {
  GetAllSurvey: (params: QuerySurveyReportParams) =>
    axiosClient.get(END_POINTS_API.SURVEY_REPORT, {
      params,
    }),
  CreateSurveyReport: (params: CreateNewSurveyReport) =>
    axiosClient.post(END_POINTS_API.SURVEY_REPORT, params),
  UpdateSurveyReport: (params: SurveyReportUpdate) => {
    const { id, ...rest } = params;
    return axiosClient.put(`${END_POINTS_API.SURVEY_REPORT}/${id}`, rest);
  },
};

export default SurveyReportAPI;
