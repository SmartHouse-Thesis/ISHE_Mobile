import {
  FileTextOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
  AuditOutlined,
  MessageOutlined,
} from "@ant-design/icons";

export const END_POINTS = {
  AUTHENTICATION: {
    LOGIN: "/api/auth/sign-in",
    SIGN_UP: "/api/auth/sign-up",
  },
  CUSTOMER_ROLE: {
    HOME: "/customer-role/home",
    PACKAGE: "/customer-role/packages",
    PACKAGE_DETAIL: "/customer-role/packages/:id",
    CONTRACT: "/customer-role/contracts",
    SURVEY: "/customer-role/survey",
    CHAT: "/customer-role/chat",
    CHAT_DETAiL: "/customer-role/chat/123",
  },
  USER_PROFILE: "/user-profile",
  STAFF_ROLE: {
    SURVEY_REPORT: "/staff-role/survey-report",
    SURVEY_REQUEST: "/staff-role/survey-request",
    CONTRACT: "/staff-role/contract",
  },
};

export const END_POINTS_API = {
  STAFF: "/api/staffs",
  TELLER: "/api/tellers",
  SIGN_IN: "/api/auth",
  PACKAGES: {
    GET_ALL: "/api/device-packages",
  },

  CUSTOMER_ROLE: {
    SIGN_UP: "/api/customers",
  },

  CONTRACTS: "/api/contracts",
  SURVEY: "/api/survey-requests",
  FEEDBACK: "/api/feedbacks",
  SURVEY_REPORT: "/api/survey-reports",
  CONTRACT_IMAGE: "/api/contracts/upload-image",
  CONTRACT_ACCEPTANCE: "/api/contracts/upload-acceptance",
};

export const ROUTES_NON_FOOTER_HEADER = [
  END_POINTS.CUSTOMER_ROLE.HOME,
  END_POINTS.CUSTOMER_ROLE.PACKAGE,
  END_POINTS.CUSTOMER_ROLE.CONTRACT,
  END_POINTS.CUSTOMER_ROLE.SURVEY,
  END_POINTS.USER_PROFILE,
  END_POINTS.STAFF_ROLE.SURVEY_REPORT,
  END_POINTS.STAFF_ROLE.SURVEY_REQUEST,
  END_POINTS.STAFF_ROLE.CONTRACT,
  END_POINTS.CUSTOMER_ROLE.CHAT,
];

export const CUSTOMER_ID = "ba192f6f-e0fb-46f4-b427-4cb324f6538c";

export const STAFF_FOOTER = [
  {
    label: "Báo cáo",
    value: END_POINTS.STAFF_ROLE.SURVEY_REPORT,
    icon: <PhoneOutlined />,
  },
  {
    label: "Hợp đồng",
    value: END_POINTS.STAFF_ROLE.CONTRACT,
    icon: <FileTextOutlined />,
  },
  {
    label: "Yêu cầu khảo sát",
    value: END_POINTS.STAFF_ROLE.SURVEY_REQUEST,
    icon: <AuditOutlined />,
  },
  {
    label: "Tài khoản",
    value: END_POINTS.USER_PROFILE,
    icon: <UserOutlined />,
  },
];

export const CUSTOMER_FOOTER = [
  {
    label: "Trang chủ",
    value: END_POINTS.CUSTOMER_ROLE.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: "Hợp đồng",
    value: END_POINTS.CUSTOMER_ROLE.CONTRACT,
    icon: <FileTextOutlined />,
  },
  {
    label: "Khảo sát",
    value: END_POINTS.CUSTOMER_ROLE.SURVEY,
    icon: <PhoneOutlined />,
  },
  {
    label: "Trò chuyện",
    value: END_POINTS.CUSTOMER_ROLE.CHAT,
    icon: <MessageOutlined />,
  },
  {
    label: "Tài khoản",
    value: END_POINTS.USER_PROFILE,
    icon: <UserOutlined />,
  },
];

export const DEFAULT_AVATAR =
  "https://img.freepik.com/premium-vector/bald-empty-face-icon-avatar-vector-illustration_601298-13391.jpg";
