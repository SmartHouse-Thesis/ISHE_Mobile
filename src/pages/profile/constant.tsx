import {
  ClockCircleOutlined,
  CreditCardOutlined,
  DownloadOutlined,
  GlobalOutlined,
  HeartOutlined,
  LogoutOutlined,
  MessageOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

export const USER_PROFILE_LIST = {
  priority: [
    {
      icon: <MessageOutlined />,
      text: "Chat",
    },
    {
      icon: <DownloadOutlined />,
      text: "Downloads",
    },
  ],
  external: [
    {
      icon: <HeartOutlined />,
      text: "Favorites",
    },
    {
      icon: <GlobalOutlined />,
      text: "Language",
    },
    {
      icon: <PushpinOutlined />,
      text: "Location",
    },
    {
      icon: <ClockCircleOutlined />,
      text: "History",
    },
  ],
  personal: [
    {
      icon: <CreditCardOutlined />,
      text: "Payment",
    },
    {
      icon: <LogoutOutlined color="red" />,
      text: "Log Out",
    },
  ],
};
