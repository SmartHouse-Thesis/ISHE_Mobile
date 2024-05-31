import { SurveyStatusEnum } from "../enums";

export type CreateNewSurveyReport = {
  surveyRequestId: string;
  recommendDevicePackageId: string;
  roomArea: number;
  description: string;
  appointmentDate: string;
};

export type SurveyReportUpdate = CreateNewSurveyReport & {
  id: string;
};

export type QuerySurveyReportParams = {
  appointmentDate: string;
  pageNumber: number;
  pageSize: number;
  status: SurveyStatusEnum;
};
