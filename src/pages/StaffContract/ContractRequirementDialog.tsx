import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CreateContractModifyRequest } from "../../api/Contract/type";
import { useMutation } from "@tanstack/react-query";
import ContractAPI from "../../api/Contract";
import { onHandleErrorAPIResponse } from "../../utils/helper";

const ContractRequirementDialog = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [contractRequestId, setContractRequestId] = useState("");
  const contractRequirementRef = useRef<any>();

  const { mutate: createContractMutation, isLoading: isLoadingCreateContract } =
    useMutation({
      mutationFn: ContractAPI.createContractModify,
      onError: (error) => onHandleErrorAPIResponse(error),
      onSuccess: () => {
        message.success("Yêu cầu được gửi đi thành công");
        onCloseModal();
      },
    });

  useImperativeHandle(ref, () => {
    return {
      openModal: (contractId: string) => {
        setContractRequestId(contractId);
        setIsOpenModal(true);
      },
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSubmitForm = (values: CreateContractModifyRequest) => {
    createContractMutation({
      contractId: contractRequestId,
      description: values.description,
      type: values.type,
    });
  };

  return (
    <Modal
      open={isOpenModal}
      title="Yêu cầu hợp đồng"
      onCancel={onCloseModal}
      closeIcon
      footer={null}
    >
      <Form layout="vertical" onFinish={onSubmitForm} style={{ width: "100%" }}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item
              name={"type"}
              label="Loại yêu cầu"
              rules={[{ required: true, message: "Yêu cầu chọn loại yêu cầu" }]}
            >
              <Select
                options={[
                  {
                    label: "Chỉnh sửa hợp đồng",
                    value: "Modify",
                  },
                  {
                    label: "Hủy hợp đồng",
                    value: "Cancel",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Yêu cầu nhập mô tả" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Button
            type="primary"
            style={{ width: "100%" }}
            htmlType="submit"
            loading={isLoadingCreateContract}
          >
            Gửi yêu cầu
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(ContractRequirementDialog);
