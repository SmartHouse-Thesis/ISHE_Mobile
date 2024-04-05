export type ImageItemTypes = {
  id: string;
  url: string;
  createAt: string;
};

export type ManufactureItemTypes = {
  id: string;
  name: string;
  createAt: string;
};

export type PromotionItemTypes = {
  id: string;
  name: string;
  discountAmount: number;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
  createAt: string;
};

export enum DeviceStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export type SmartDeviceItemTypes = {
  id: string;
  name: string;
  price: number;
  installationPrice: number;
  deviceType: null | string;
  status: DeviceStatus;
  createAt: string;
  manufacturer: string;
  image: string;
};

export type CustomerItemTypes = {
  accountId: string;
  phoneNumber: string;
  roleName: string;
  fullName: string;
  email: string;
  avatar: null;
  address: string;
  otp: null;
  status: DeviceStatus;
  createAt: string;
};

export type StaffItemTypes = {
  accountId: string;
  phoneNumber: string;
  roleName: string;
  fullName: string;
  email: string;
  avatar: null;
  isLead: boolean;
  status: DeviceStatus;
  createAt: string;
};

export type TellerItemTypes = {
  accountId: string;
  phoneNumber: string;
  roleName: string;
  fullName: string;
  email: string;
  avatar: null;
  status: DeviceStatus;
  createAt: string;
};

export type UserProfileTypes = {
  id: string;
  phoneNumber: string;
  fullName: string;
  email: string;
  avatar: null;
  roleName: string;
  status: string;
  createAt: string;
};
