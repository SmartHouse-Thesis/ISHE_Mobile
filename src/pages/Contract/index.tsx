import { useMutation } from "@tanstack/react-query";
import { Card, Descriptions, Empty, Flex, Input, Skeleton, Tag } from "antd";
import ContractAPI from "../../api/Contract";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { ChangeEvent, useEffect, useState } from "react";
import { ContractItemTypes } from "../../api/Contract/type";
import dayjs from "dayjs";
import { DateTimeFormat } from "../../enums";
import _ from "lodash";

const CustomerContract = () => {
  const [contracts, setContracts] = useState<ContractItemTypes[]>([]);

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

  useEffect(() => {
    mutateContracts({
      customerId: "",
      pageNumber: 0,
      pageSize: 0,
      staffId: "",
    });
  }, []);

  if (isLoadingContractList) {
    return <Skeleton />;
  }

  const onSearchContract = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    if (data) {
      const result = data.data.filter((item: ContractItemTypes) =>
        item.title.toLowerCase().includes(keyword)
      );
      setContracts(result);
    }
  };

  return (
    <Flex vertical gap="middle">
      <Input.Search
        placeholder="Tìm kiếm hợp đồng"
        onChange={_.debounce(onSearchContract, 500)}
      />

      {contracts.map((contract: ContractItemTypes) => {
        return (
          <Card key={contract.id} title={contract.title}>
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
