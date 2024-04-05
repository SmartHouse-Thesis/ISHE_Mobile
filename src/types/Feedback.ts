export type CreateFeedbackTypes = {
  customerId: string;
  devicePackageId: string;
  rating: number;
  content: string;
};

export type UpdateFeedbackTypes = {
  id: string;
  rating: number;
  content: string;
};
