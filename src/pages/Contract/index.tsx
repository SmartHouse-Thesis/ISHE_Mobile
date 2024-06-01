import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Card,
  Descriptions,
  Empty,
  Flex,
  Grid,
  Input,
  Skeleton,
  Spin,
  Tag,
} from "antd";
import ContractAPI from "../../api/Contract";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ContractItemTypes } from "../../api/Contract/type";
import dayjs from "dayjs";
import { ContractStatusEnum, DateTimeFormat } from "../../enums";
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ContractRequirementDialog from "../StaffContract/ContractRequirementDialog";
import PaymentRequestDialog from "../StaffContract/PaymentRequestDialog";
import PaymentAPI, { ZaloPaymentTypes } from "../../api/Payment";

const CustomerContract = () => {
  const [contracts, setContracts] = useState<ContractItemTypes[]>([]);
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );
  const contractRequirementRef = useRef<any>();
  const contractPaymentRef = useRef<any>();

  const {
    isLoading: isLoadingContractList,
    data,
    mutate: mutateContracts,
  } = useMutation({
    mutationFn: ContractAPI.getAllContracts,
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
    onSuccess: (res) => {
      return setContracts(res.data);
    },
  });

  const { mutate: createPaymentLinkMutate, isLoading: isLoadingPayment } =
    useMutation({
      mutationFn: PaymentAPI.getZaloPayment,
      onError: (error) => onHandleErrorAPIResponse(error),
      onSuccess: (res: any) => {
        contractPaymentRef.current.openModal(res.order_url);
      },
    });

  useEffect(() => {
    mutateContracts({
      customerId: userProfileState.id,
      pageNumber: 0,
      pageSize: 999,
      staffId: "",
    });
  }, []);

  const onSearchContract = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    if (data) {
      const result = data.data.filter((item: ContractItemTypes) =>
        item.title.toLowerCase().includes(keyword)
      );
      setContracts(result);
    }
  };

  const onOpenContractRequest = (contractId: string) =>
    contractRequirementRef.current.openModal(contractId);

  const onCreatePaymentLink = (
    contractId: string,
    contractType: ZaloPaymentTypes
  ) => {
    createPaymentLinkMutate({
      contractId,
      typePayment: contractType,
    });
  };

  if (isLoadingContractList) {
    return (
      <Flex justify="center" align="center" style={{ height: "70vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex vertical gap="middle">
      <ContractRequirementDialog ref={contractRequirementRef} />
      <PaymentRequestDialog ref={contractPaymentRef} />
      <Input.Search
        placeholder="Tìm kiếm hợp đồng"
        onChange={_.debounce(onSearchContract, 500)}
      />
      {contracts.map((contract: ContractItemTypes) => {
        return (
          <Card
            key={contract.id}
            title={contract.title}
            style={{
              border: "1px solid #000",
              borderRadius: "1rem",
            }}
          >
            <Flex vertical gap="middle">
              <Descriptions
                items={[
                  { label: "Mô tả", children: contract.description },
                  {
                    label: "Ngày bắt đầu",
                    children: dayjs(contract.startPlanDate).format(
                      DateTimeFormat.DATE_FORMAT
                    ),
                  },
                  {
                    label: "Ngày kết thúc",
                    children: dayjs(contract.endPlanDate).format(
                      DateTimeFormat.DATE_FORMAT
                    ),
                  },
                  {
                    label: "Tiền gửi",
                    children: contract.deposit,
                  },
                  {
                    label: "Tổng tiền",
                    children: (
                      <Tag color="green">{contract.totalAmount.toFixed(2)}</Tag>
                    ),
                  },
                  {
                    label: "Trạng thái",
                    children: <Tag color="geekblue">{contract.status}</Tag>,
                  },
                  {
                    label: "Người lắp đặt",
                    children: contract.staff.fullName,
                  },
                  {
                    label: "Nguồi tư vấn",
                    children: contract.teller.fullName,
                  },
                  {
                    label: "Chức năng",
                    children: (
                      <Flex gap={12}>
                        <Button
                          size="small"
                          onClick={() => onOpenContractRequest(contract.id)}
                          type="primary"
                          disabled={
                            ![
                              ContractStatusEnum.PENDiNG_DEPOSIT,
                              ContractStatusEnum.DEPOSIT_PAID,
                            ].includes(contract.status as ContractStatusEnum)
                          }
                        >
                          Yêu cầu
                        </Button>
                        <Button
                          onClick={() =>
                            onCreatePaymentLink(
                              contract.id,
                              contract.status ===
                                ContractStatusEnum.PENDiNG_DEPOSIT
                                ? ZaloPaymentTypes.Deposit
                                : ZaloPaymentTypes.Completion
                            )
                          }
                          size="small"
                          type="primary"
                          loading={isLoadingPayment}
                          disabled={
                            ![
                              ContractStatusEnum.PENDiNG_DEPOSIT,
                              ContractStatusEnum.WAIT_FOR_PAID,
                            ].includes(contract.status as ContractStatusEnum)
                          }
                        >
                          Thanh toán
                        </Button>
                      </Flex>
                    ),
                  },
                ]}
              />
            </Flex>
          </Card>
        );
      })}

      {!contracts.length && <Empty />}
    </Flex>
  );
};

export default CustomerContract;
