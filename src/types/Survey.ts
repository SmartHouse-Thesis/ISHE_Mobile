import { CustomerItemTypes, StaffItemTypes } from ".";
import { SurveyStatusEnum } from "../enums";

export type CreateNewSurveyTypes = {
  customerId: string;
  surveyDate: string;
  description: string;
};

export type SurveyItemTypes = {
  id: string;
  surveyDate: string;
  description: string;
  status: SurveyStatusEnum;
  createAt: string;
  customer: CustomerItemTypes;
  staff: StaffItemTypes | null;
};

export type SurveyFilterTypes = {
  customerId?: string;
  staffId?: string;
  surveyDate?: string;
  status?: SurveyStatusEnum;
  pageNumber?: number;
  pageSize?: number;
};
