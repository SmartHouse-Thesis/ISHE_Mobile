import { Avatar, Button, Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateUserProfile } from "../../redux/userProfileSlice";
import { useHistory } from "react-router";
import { END_POINTS } from "../../utils/constant";

const UserProfile = () => {
  const userProfileState = useSelector((selector: RootState) => selector.userProfile.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const onHandleLogout = () => {
    localStorage.clear();
    dispatch(
      updateUserProfile({
        id: "",
        phoneNumber: "",
        fullName: "",
        email: "",
        avatar: null,
        roleName: "",
        status: "",
        createAt: "",
      })
    );
    history.replace(END_POINTS.AUTHENTICATION.LOGIN);
  };
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
          <Button type="primary">Chỉnh sửa thông tin</Button>
        </Flex>
      </Flex>

      <Button block type="primary" onClick={onHandleLogout}>
        Đăng xuất
      </Button>
    </Flex>
  );
};

export default UserProfile;
