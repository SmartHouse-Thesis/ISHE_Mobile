import { StaffAccountStatus } from "../enums/staff";

export type StaffParamsTypes = {
  fullName?: string;
  phoneNumber?: string;
  status?: StaffAccountStatus;
  pageNumber?: number;
  pagSize?: number;
};
