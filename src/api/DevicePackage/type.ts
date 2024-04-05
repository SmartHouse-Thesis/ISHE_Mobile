import {
  CustomerItemTypes,
  ImageItemTypes,
  ManufactureItemTypes,
  PromotionItemTypes,
  SmartDeviceItemTypes,
} from "../../types";

export type DevicePackageTypes = {
  id: string;
  name: string;
  warrantyDuration: number;
  completionTime: number;
  description: string;
  price: number;
  status: string;
  createAt: string;
  manufacturer: ManufactureItemTypes;
  promotion: PromotionItemTypes;
  images: ImageItemTypes[];
};

export type DevicePackageDetailTypes = {
  smartDevicePackages: SmartDevicePackageItemTypes[];
  feedbackDevicePackages: FeedbackItemTypes[];
} & DevicePackageTypes;

export type SmartDevicePackageItemTypes = {
  smartDeviceQuantity: number;
  smartDevice: SmartDeviceItemTypes;
};

export type FeedbackItemTypes = {
  content: string;
  createdAt: string;
  customer: CustomerItemTypes;
  id: string;
  rating: number;
};
