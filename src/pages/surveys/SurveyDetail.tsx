import {
  Avatar,
  Badge,
  Descriptions,
  Empty,
  Flex,
  Modal,
  Tabs,
  Typography,
} from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { SurveyItemTypes } from "../../types/Survey";
import dayjs from "dayjs";
import CreateSurveyReport from "../Report/CreateSurveyReport";

type SurveyDetailProps = {
  surveyItem: SurveyItemTypes;
};

const SurveyDetail = ({ surveyItem }: SurveyDetailProps, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const createSurveyReportRef = useRef<any>();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Modal
      open={isOpenModal}
      title="Chi tiết khảo sát"
      onCancel={onCloseModal}
      closeIcon
      footer={null}
    >
      <CreateSurveyReport
        ref={createSurveyReportRef}
        AfterCloseModal={() => {}}
        SurveyReportUpdate={undefined}
      />
      <Tabs
        items={[
          {
            key: "info",
            label: "Thông tin yêu cầu",
            children: <SurveyInfo surveyItem={surveyItem} />,
          },
          {
            key: "staff-info",
            label: "Thông tin nhân viên",
            children: <StaffInfo surveyItem={surveyItem} />,
          },
        ]}
      />
    </Modal>
  );
};

export default forwardRef(SurveyDetail);

const SurveyInfo = ({ surveyItem }: SurveyDetailProps) => {
  return (
    <Descriptions
      size="small"
      bordered
      items={[
        {
          key: "name",
          label: "Khách hàng",
          children: surveyItem.customer.fullName,
        },
        {
          key: "customer-phone",
          label: "Số điện thoại",
          children: surveyItem.customer.phoneNumber,
        },
        {
          key: "survey-date",
          label: "Ngày khảo sát",
          children: dayjs(surveyItem.surveyDate).format("MM/DD/YYYY HH:mm A"),
        },
        {
          key: "status",
          label: "Trạng thái",
          children: <Badge status="processing" text={surveyItem.status} />,
        },
        {
          key: "desc",
          label: "Mô tả",
          children: <Typography.Text>{surveyItem.description}</Typography.Text>,
        },
      ]}
    />
  );
};

const StaffInfo = ({ surveyItem }: SurveyDetailProps) => {
  return surveyItem?.staff ? (
    <Descriptions
      size="small"
      bordered
      items={[
        {
          key: "survey-date",
          label: "Tên",
          children: (
            <Flex align="center" gap={10}>
              <Avatar size={"small"}>N</Avatar>
              <Typography.Text>{surveyItem.staff.fullName}</Typography.Text>
            </Flex>
          ),
        },
        {
          key: "email",
          label: "Email",
          children: <Typography.Text>{surveyItem.staff.email}</Typography.Text>,
        },
        {
          key: "phone-number",
          label: "Số điện thoại",
          children: surveyItem.staff.phoneNumber,
        },
      ]}
    />
  ) : (
    <Flex align="center" justify="center">
      <Empty />
    </Flex>
  );
};
