import { ContractStatusEnum } from "../../enums";
import { CustomerItemTypes, StaffItemTypes, TellerItemTypes } from "../../types";

export type ContractListByCustomerId = {
  staffId?: string;
  customerId?: string;
  pageNumber?: number;
  pageSize?: number;
  status?: ContractStatusEnum;
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

export type UpdateContractTypes = {
  id: string;
  staffId: string;
  title: string;
  description: string;
  status: string;
  devicePackages: string[];
  contractDetails: {
    smartDeviceId: string;
    quantity: number;
  }[];
};
