import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ZaloPaymentTypes } from "../../api/Payment";
import { Button, Flex, Image, Modal } from "antd";

const PaymentRequestDialog = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [contractUrl, setContractUrl] = useState("");

  useImperativeHandle(ref, () => {
    return {
      openModal: (contractUrl: string) => {
        setContractUrl(contractUrl);
        setIsOpenModal(true);
      },
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onOpenLink = () => window.open(contractUrl, "_system", "location=yes");
  return (
    <Modal open={isOpenModal} title="Đường dẫn thanh toán" onCancel={onCloseModal} closeIcon footer={null}>
      <Flex vertical gap={20} align="center">
        <Image src="https://png.pngtree.com/png-vector/20220128/ourmid/pngtree-dec13-png-image_4371656.png" width={120} height={120} />
        <Button onClick={onOpenLink} type="primary" style={{ width: "100%" }}>
          Truy cập
        </Button>
      </Flex>
    </Modal>
  );
};

export default forwardRef(PaymentRequestDialog);
