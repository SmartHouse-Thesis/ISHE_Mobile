import { ArrowLeftOutlined } from "@ant-design/icons";
import { Avatar, Flex, Typography } from "antd";

//TalkJS
import { Chatbox, Inbox, Session } from "@talkjs/react";
import ChatServerComponent from "../chatServer";
import { useCallback } from "react";
import Talk from "talkjs";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const ChatDetail = () => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );

  const syncConversation = useCallback((session: any) => {
    // JavaScript SDK code here
    // const conversation = session.getOrCreateConversation("staff_2");

    const conversation = session.getOrCreateConversation(
      Talk.oneOnOneId(userProfileState.id, "staff_2")
    );

    const other = new Talk.User({
      id: "staff2",
      name: "Minh Hoang",
      email: "nani@example.com",
      photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
      welcomeMessage: "Hi!",
    });
    conversation.setParticipant(other);
    conversation.setParticipant(session.me);

    return conversation;
  }, []);

  return (
    <Flex vertical gap={10}>
      <ChatServerComponent>
        <Inbox
          syncConversation={syncConversation}
          style={{ width: "100%", height: "500px" }}
        ></Inbox>
      </ChatServerComponent>
    </Flex>
  );
};

export default ChatDetail;
