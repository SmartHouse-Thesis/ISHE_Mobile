import { useMutation } from "@tanstack/react-query";
import { Card, Descriptions, Flex, Input, Skeleton, Tag } from "antd";
import ContractAPI from "../../api/Contract";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ContractItemTypes,
  ContractListByCustomerId,
} from "../../api/Contract/type";
import dayjs from "dayjs";
import { DateTimeFormat } from "../../enums";
import _ from "lodash";

const CustomerContract = () => {
  const [contracts, setContracts] = useState<ContractItemTypes[]>([]);

  const {
    isPending: isLoadingContractList,
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
        placeholder="Search contract"
        onChange={_.debounce(onSearchContract, 500)}
      />

      {contracts.map((contract: ContractItemTypes) => {
        return (
          <Card key={contract.id} title={contract.title}>
            <Flex vertical gap="middle">
              <Descriptions
                items={[
                  { label: "Description", children: contract.description },
                  {
                    label: "Start date",
                    children: dayjs(contract.startPlanDate).format(
                      DateTimeFormat.DATE_FORMAT
                    ),
                  },
                  {
                    label: "End date",
                    children: dayjs(contract.endPlanDate).format(
                      DateTimeFormat.DATE_FORMAT
                    ),
                  },
                  {
                    label: "Deposit",
                    children: contract.deposit,
                  },
                  {
                    label: "Total Amount",
                    children: (
                      <Tag color="green">{contract.totalAmount.toFixed(2)}</Tag>
                    ),
                  },
                  {
                    label: "Status",
                    children: <Tag color="geekblue">{contract.status}</Tag>,
                  },
                  {
                    label: "Staff",
                    children: contract.staff.fullName,
                  },
                  {
                    label: "Teller",
                    children: contract.teller.fullName,
                  },
                ]}
              />
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default CustomerContract;
