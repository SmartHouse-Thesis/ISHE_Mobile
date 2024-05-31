import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Empty, List, Modal, Spin } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useHistory } from "react-router";
import { TellerItemTypes } from "../../types";
import { MessageOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { selectChatWithStaff } from "../../redux/tellerSlice";
import { END_POINTS } from "../../utils/constant";
import TellerAPI from "../../api/Teller";

const StaffList = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const { isLoading: isLoadingTellerList, data: tellers } = useQuery({
    queryFn: TellerAPI.GetTellerList,
    queryKey: ["staff-list-key"],
  });

  const router = useHistory();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  if (tellers && !tellers.data.length) {
    return <Empty />;
  }

  const onChattingWithStaff = (staff: TellerItemTypes) => {
    dispatch(selectChatWithStaff(staff));
    router.push(END_POINTS.CUSTOMER_ROLE.CHAT);
  };

  return (
    <Modal
      open={isOpenModal}
      title="Danh sách nhân viên"
      onCancel={onCloseModal}
      closeIcon
      footer
    >
      <Spin spinning={isLoadingTellerList}>
        <List
          pagination={{ position: "bottom", align: "end", pageSize: 5 }}
          dataSource={tellers?.data}
          renderItem={(item: TellerItemTypes) => {
            return (
              <List.Item
                key={item.accountId}
                actions={[
                  <Button
                    icon={<MessageOutlined />}
                    onClick={() => onChattingWithStaff(item)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://img.freepik.com/premium-vector/bald-empty-face-icon-avatar-vector-illustration_601298-13391.jpg" />
                  }
                  title={<a href="https://ant.design">{item.fullName}</a>}
                />
              </List.Item>
            );
          }}
        />
      </Spin>
    </Modal>
  );
};

export default forwardRef(StaffList);
