export enum DateTimeFormat {
  DATE_FORMAT = "YYYY-MM-DD",
  FULL_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm A",
}

export enum SurveyStatusEnum {
  INPROGESS = "InProgress",
  PENDING = "Pending",
  COMPLETED = "Completed",
  REJECTED = "Rejected",
  ALL = "",
}

export enum NavigateMenuEnum {
  HOME = "Home",
  CONTRACT = "Contract",
  SURVEY = "Survey",
  PROFILE = "Profile",
}

export enum SystemRole {
  STAFF = "Staff",
  CUSTOMER = "Customer",
}

export enum ContractStatusEnum {
  PENDiNG_DEPOSIT = "PendingDeposit",
  DEPOSIT_PAID = "DepositPaid",
  IN_PROGRESS = "InProgress",
  WAIT_FOR_PAID = "WaitForPaid",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}
