import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Rate,
  Row,
  message,
} from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import FeedbackAPI from "../../../api/Feedback";
import { FeedbackItemTypes } from "../../../api/DevicePackage/type";
import { onHandleErrorAPIResponse } from "../../../utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

type FeedbackModalTypes = {
  PackageId: string;
  FeedbackUpdateProp: FeedbackItemTypes;
  HandleAfterCloseModal: () => void;
};

const FeedbackModal = (
  { PackageId, FeedbackUpdateProp, HandleAfterCloseModal }: FeedbackModalTypes,
  ref: any
) => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const { isPending: isLoadingCreateFeedback, mutate: createFeedback } =
    useMutation({
      mutationFn: FeedbackAPI.CreateFeedback,
      mutationKey: ["feedback-api"],
      onError: (errorResponse: any) => {
        message.error(errorResponse.response.data.message);
      },
      onSuccess: () => {
        message.success("Thêm nhận xét cho gói thành công");
        HandleAfterCloseModal();
        onCloseModal();
      },
    });

  const { isPending: isLoadingUpdateFeedback, mutate: updateFeedBack } =
    useMutation({
      mutationFn: FeedbackAPI.UpdateFeedback,
      mutationKey: ["feedback-api"],
      onError: (errorResponse) => {
        onHandleErrorAPIResponse(errorResponse);
      },
      onSuccess: () => {
        message.success("Cập nhật nhận xét thành công");
        HandleAfterCloseModal();
        onCloseModal();
      },
    });

  useEffect(() => {
    if (FeedbackUpdateProp) {
      form.setFieldsValue({
        rating: FeedbackUpdateProp.rating,
        content: FeedbackUpdateProp.content,
      });
    }
  }, [FeedbackUpdateProp]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSubmitFeedback = (values: { rating: number; content: string }) => {
    if (FeedbackUpdateProp) {
      updateFeedBack({
        content: values.content,
        id: FeedbackUpdateProp.id,
        rating: values.rating,
      });
    } else {
      createFeedback({
        ...values,
        customerId: userProfileState.id,
        devicePackageId: PackageId,
      });
    }
  };

  return (
    <Modal
      open={isOpenModal}
      title="Nhận xét"
      onCancel={onCloseModal}
      closeIcon
      footer
    >
      <Form form={form} onFinish={onSubmitFeedback}>
        <Row>
          <Col span={24}>
            <Flex justify="center">
              <Form.Item name="rating">
                <Rate character={({ index = 0 }) => customIcons[index + 1]} />
              </Form.Item>
            </Flex>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Yêu cầu nhập nội dung nhận xét",
                },
              ]}
            >
              <Input.TextArea placeholder="Nội dung ..." rows={3} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Flex align="center" justify="end" gap="middle">
              <Button onClick={onCloseModal}>Đóng cửa sổ</Button>
              <Button
                type="primary"
                loading={isLoadingCreateFeedback || isLoadingUpdateFeedback}
                htmlType="submit"
              >
                {FeedbackUpdateProp ? "Cập nhật nhận xét" : "Nhận xét"}
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(FeedbackModal);
