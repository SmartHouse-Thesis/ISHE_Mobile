import { Empty, Flex, Spin } from "antd";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCallback } from "react";
import Talk from "talkjs";
import ChatServerComponent from "./chatServer";
import { Inbox } from "@talkjs/react";

const CustomerChat = () => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );

  const staffProfileState = useSelector(
    (root: RootState) => root.staffSlice.account
  );

  const syncConversation = useCallback((session: any) => {
    if (staffProfileState) {
      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(userProfileState.id, staffProfileState.accountId || "")
      );

      const other = new Talk.User({
        id: staffProfileState.accountId || "",
        name: staffProfileState.fullName,
        email: staffProfileState.email,
        photoUrl:
          "https://img.freepik.com/premium-vector/bald-empty-face-icon-avatar-vector-illustration_601298-13391.jpg",
        welcomeMessage: "Chào bạn. ",
      });
      conversation.setParticipant(other);
      conversation.setParticipant(session.me);

      return conversation;
    }
  }, []);

  return (
    <Flex vertical gap={10}>
      <ChatServerComponent>
        {staffProfileState.accountId ? (
          <Inbox
            loadingComponent={
              <Flex align="center" justify="center" style={{ height: "70vh" }}>
                <Spin tip="Đang tải nội dung trò chuyện" size="large"></Spin>
              </Flex>
            }
            syncConversation={syncConversation}
            style={{ width: "100%", height: "100vh" }}
          ></Inbox>
        ) : (
          <Empty />
        )}
      </ChatServerComponent>
    </Flex>
  );
};

export default CustomerChat;
