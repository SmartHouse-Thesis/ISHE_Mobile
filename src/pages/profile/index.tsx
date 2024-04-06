import { Avatar, Button, Divider, Flex, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { USER_PROFILE_LIST } from "./constant";

const UserProfile = () => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );

  return (
    <Flex vertical gap="middle">
      <Flex gap="middle">
        <Avatar
          style={{
            width: 80,
            height: 80,
          }}
          size={"large"}
          src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        />

        <Flex vertical gap={10}>
          <div style={{ fontWeight: "500" }}>{userProfileState.fullName}</div>
          <div style={{ fontSize: "14px" }}>{userProfileState.phoneNumber}</div>
          <Button type="primary">Edit Profile</Button>
        </Flex>
      </Flex>

      <Flex vertical gap={10}>
        {USER_PROFILE_LIST.priority.map((item) => {
          return (
            <Flex gap={10} style={{ cursor: "pointer" }}>
              {item.icon}
              <Typography>{item.text}</Typography>
            </Flex>
          );
        })}
        <Divider style={{ margin: 0 }} />

        {USER_PROFILE_LIST.external.map((item) => {
          return (
            <Flex gap={10} style={{ cursor: "pointer" }}>
              {item.icon}
              <Typography>{item.text}</Typography>
            </Flex>
          );
        })}

        <Divider style={{ margin: 0 }} />

        {USER_PROFILE_LIST.personal.map((item) => {
          return (
            <Flex gap={10} style={{ cursor: "pointer" }}>
              {item.icon}
              <Typography>{item.text}</Typography>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default UserProfile;
