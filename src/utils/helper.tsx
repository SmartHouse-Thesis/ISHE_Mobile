import { Tag, message } from "antd";
import { SurveyStatusEnum } from "../enums";

export const onHandleErrorAPIResponse = (errorResponse: any) => {
  if (errorResponse.response!.status >= 500) {
    message.error(
      "Something happened in the our system. Please try again, thanks you. "
    );
  }

  errorResponse.response && message.error(errorResponse.response.data.message);
};

export const onLoadSurveyStatus = (status: SurveyStatusEnum) => {
  switch (status) {
    case SurveyStatusEnum.COMPLETED: {
      return <Tag color="green">{SurveyStatusEnum.COMPLETED}</Tag>;
    }
    case SurveyStatusEnum.PENDING: {
      return <Tag color="blue">{SurveyStatusEnum.PENDING}</Tag>;
    }
    case SurveyStatusEnum.INPROGESS: {
      return <Tag color="gold">{SurveyStatusEnum.INPROGESS}</Tag>;
    }
    case SurveyStatusEnum.REJECTED: {
      return <Tag color="error">{SurveyStatusEnum.REJECTED}</Tag>;
    }
  }
};
