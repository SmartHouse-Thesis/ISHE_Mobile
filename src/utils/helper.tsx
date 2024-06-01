import { Tag, message } from "antd";
import { SurveyStatusEnum } from "../enums";

export const onHandleErrorAPIResponse = (errorResponse: any) => {
  if (errorResponse.response!.status >= 500) {
    return message.error("Something happened in the our system. Please try again, thanks you. ");
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

export const firebaseConfig = {
  apiKey: "AIzaSyA7whJONp5a-D-Taxc5Hq3LqxO0RG0aDB0",
  authDomain: "smarthome-856d3.firebaseapp.com",
  projectId: "smarthome-856d3",
  storageBucket: "smarthome-856d3.appspot.com",
  messagingSenderId: "138230736587",
  appId: "1:138230736587:web:a78b467fb9d3d04aa25d4e",
  measurementId: "G-STRZ5HY3LB",
  JsonFilePath: "../ISHE_Utility/Helpers/CloudStorage/smarthome-856d3-firebase-adminsdk-88tdt-cc841847e7.json",
};
