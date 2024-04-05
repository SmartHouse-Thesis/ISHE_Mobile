import {
  CustomerItemTypes,
  StaffItemTypes,
  TellerItemTypes,
} from "../../types";

export type ContractListByCustomerId = {
  staffId?: string;
  customerId?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type ContractItemTypes = {
  id: string;
  title: string;
  description: string;
  startPlanDate: string;
  endPlanDate: string;
  actualStartDate: null;
  actualEndDate: null;
  totalAmount: number;
  imageUrl: string;
  deposit: number;
  status: string;
  createAt: string;
  customer: CustomerItemTypes;
  staff: StaffItemTypes;
  teller: TellerItemTypes;
};
