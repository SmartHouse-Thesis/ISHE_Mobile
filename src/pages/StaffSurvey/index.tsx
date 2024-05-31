import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import SurveyRequestAPI from "../../api/Survey";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { Card, Flex, Input, Select, Skeleton, Tag } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { debounce } from "lodash";
import { SurveyStatusEnum } from "../../enums";
import { SurveyItemTypes } from "../../types/Survey";
import dayjs from "dayjs";

const StaffSurvey = () => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );
  const [surveyRequest, setSurveyRequest] = useState<SurveyItemTypes[]>([]);

  const {
    isLoading: isLoadingSurveyList,
    mutate: getSurveyList,
    data: surveyRequestList,
  } = useMutation({
    mutationFn: SurveyRequestAPI.GetSurveyList,
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
    onSuccess: (res) => {
      setSurveyRequest(res.data);
    },
  });

  useEffect(() => {
    getSurveyList({
      staffId: userProfileState.id,
    });
  }, []);

  const onFilterSurveyStatus = (status: SurveyStatusEnum) => {
    getSurveyList({
      staffId: userProfileState.id,
      status,
    });
  };

  const onSearchSurveyName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    if (surveyRequestList) {
      const result = surveyRequestList.data.filter((item: SurveyItemTypes) =>
        item.description.toLowerCase().includes(value)
      );
      setSurveyRequest(result);
    }
  };

  const onGetStatusColor = (status: string) => {
    switch (status) {
      case SurveyStatusEnum.COMPLETED: {
        return "green";
      }

      case SurveyStatusEnum.INPROGESS: {
        return "blue";
      }

      case SurveyStatusEnum.PENDING: {
        return "yellow";
      }

      case SurveyStatusEnum.REJECTED: {
        return "red";
      }
    }
  };

  if (isLoadingSurveyList) {
    return <Skeleton paragraph />;
  }

  return (
    <Flex vertical gap="middle">
      <Flex align="center" gap="middle">
        <Input.Search
          placeholder="Tìm mô tả khảo sất"
          onChange={debounce(onSearchSurveyName, 500)}
        />
        <Select
          placeholder="Trạng thái"
          onChange={(event) => onFilterSurveyStatus(event)}
          options={[
            {
              label: "All",
              value: "",
            },
            {
              label: "Completed",
              value: SurveyStatusEnum.COMPLETED,
            },
            {
              label: "Pending",
              value: SurveyStatusEnum.PENDING,
            },
            {
              label: "Inprogress",
              value: SurveyStatusEnum.INPROGESS,
            },
            {
              label: "Rejected",
              value: SurveyStatusEnum.REJECTED,
            },
          ]}
        />
      </Flex>

      {surveyRequest && (
        <Flex vertical gap="middle">
          {surveyRequest.map((item) => {
            return (
              <Card size="small" key={item.id}>
                <Flex vertical gap={4} flex={1}>
                  <Flex justify="space-between" gap="middle" align="flex-start">
                    <div className="survey-title">{item.description}</div>
                    <Tag color={onGetStatusColor(item.status)}>
                      {item.status}
                    </Tag>
                  </Flex>

                  <Flex justify="space-between" align="center" gap="middle">
                    <div className="customer-name">
                      {item.customer.fullName}
                    </div>
                    <div className="customer-name">
                      {dayjs(item.surveyDate).format("MM/DD/YYYY HH:mm")}
                    </div>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default StaffSurvey;