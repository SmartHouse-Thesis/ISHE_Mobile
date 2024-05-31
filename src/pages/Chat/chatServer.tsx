import { useCallback } from "react";
import { Session } from "@talkjs/react";
import Talk from "talkjs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChatServerComponent = ({ children }: any) => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: userProfileState.id || "",
        name: userProfileState.fullName,
        email: userProfileState.email,
        photoUrl: "https://talkjs.com/new-web/avatar-5.jpg",
        welcomeMessage: "Chào bạn",
      }),
    []
  );

  return (
    <Session appId="trYfckWX" syncUser={syncUser}>
      {children}
    </Session>
  );
};

export default ChatServerComponent;
