import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  message,
} from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CreateNewSurveyReport } from "../../../types/SurveyReport";
import { SelectTypes } from "../../../types";
import { useMutation } from "@tanstack/react-query";
import SurveyReportAPI from "../../../api/SurveyReport";
import DevicePackagesAPI from "../../../api/DevicePackage";
import { onHandleErrorAPIResponse } from "../../../utils/helper";
import { DevicePackageTypes } from "../../../api/DevicePackage/type";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import SurveyRequestAPI from "../../../api/Survey";
import { SurveyItemTypes } from "../../../types/Survey";
import dayjs from "dayjs";

type CreateSurveyTypes = {
  AfterCloseModal: () => void;
  SurveyReportUpdate: any;
};

const CreateSurveyReportModal = (
  { AfterCloseModal, SurveyReportUpdate }: CreateSurveyTypes,
  ref: any
) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [surveyRequestSelect, setSurveyRequestSelect] = useState<SelectTypes[]>(
    []
  );
  const [devicePackageSelect, setDevicePackageSelect] = useState<SelectTypes[]>(
    []
  );

  const { isLoading: isLoadingCreateReport, mutate: createSurveyReport } =
    useMutation({
      mutationFn: SurveyReportAPI.CreateSurveyReport,
      mutationKey: ["survey-report-key"],
      onError: (error) => {
        onHandleErrorAPIResponse(error);
      },
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Tạo mới bản báo cáo thành công",
        });
        AfterCloseModal();
        onCloseModal();
      },
    });

  const {
    isLoading: isDevicePackagesLoading,
    mutate: mutateAllDevicePackages,
  } = useMutation({
    mutationFn: DevicePackagesAPI.getAllDevicePackages,
    mutationKey: ["device-package-key"],
    onError: (errorResponse) => {
      onHandleErrorAPIResponse(errorResponse);
    },
    onSuccess: (res) => {
      const convertPackagesSelect = res.data.map((item: DevicePackageTypes) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setDevicePackageSelect(convertPackagesSelect);
    },
  });

  const { isLoading: isLoadingSurveyList, mutate: getSurveyList } = useMutation(
    {
      mutationFn: SurveyRequestAPI.GetSurveyList,
      onError: (error) => {
        onHandleErrorAPIResponse(error);
      },
      onSuccess: (res) => {
        const convertSurveyRequest = res.data.map((item: SurveyItemTypes) => {
          return {
            label: item.description,
            value: item.id,
          };
        });
        setSurveyRequestSelect(convertSurveyRequest);
      },
    }
  );

  const { isLoading: isLoadingUpdateSurveyReport, mutate: updateSurveyReport } =
    useMutation({
      mutationFn: SurveyReportAPI.UpdateSurveyReport,
      onError: (error) => {
        onHandleErrorAPIResponse(error);
      },
      onSuccess: (res) => {
        messageApi.open({
          type: "success",
          content: "Cập nhật bản báo cáo thành công",
        });
        AfterCloseModal();
        onCloseModal();
      },
    });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    mutateAllDevicePackages();
    getSurveyList({
      customerId: "",
    });
  }, []);

  useEffect(() => {
    if (SurveyReportUpdate) {
      form.setFieldsValue({
        appointmentDate: dayjs(SurveyReportUpdate.appointmentDate),
        roomArea: SurveyReportUpdate.roomArea,
        surveyRequestId: SurveyReportUpdate.surveyRequest.id,
        recommendDevicePackageId: SurveyReportUpdate.recommendDevicePackage.id,
        description: SurveyReportUpdate.description,
      });
    }
  }, [SurveyReportUpdate]);

  const onCloseModal = () => {
    form.resetFields();
    setIsOpenModal(false);
  };

  const onSubmitSurveyReportForm = (values: CreateNewSurveyReport) => {
    if (SurveyReportUpdate) {
      updateSurveyReport({
        ...values,
        id: SurveyReportUpdate.id,
      });
    } else {
      createSurveyReport(values);
    }
  };

  if (isDevicePackagesLoading || isLoadingSurveyList) {
    return <Skeleton paragraph />;
  }

  return (
    <Modal
      title={SurveyReportUpdate ? "Cập nhật báo cáo" : "Tạo bảng báo cáo"}
      open={isOpenModal}
      onCancel={onCloseModal}
      footer
    >
      {contextHolder}
      <Form layout="vertical" form={form} onFinish={onSubmitSurveyReportForm}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item
              label="Yêu cẩu khảo sát"
              name="surveyRequestId"
              rules={[{ required: true, message: "Yêu cầu nhập thông tin" }]}
            >
              <Select options={surveyRequestSelect} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Gói thiết bị"
              name="recommendDevicePackageId"
              rules={[{ required: true, message: "Yêu cầu nhập thông tin" }]}
            >
              <Select options={devicePackageSelect} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Khu vực phòng"
              name="roomArea"
              rules={[{ required: true, message: "Nhập khu vưc phòng" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Ngày hẹn"
              name="appointmentDate"
              rules={[{ required: true, message: "Yêu cầu chọn ngày hẹn" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Flex align="center" gap={5} justify="flex-end">
              <Button onClick={onCloseModal}>Đóng</Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={isLoadingCreateReport || isLoadingUpdateSurveyReport}
              >
                Xác nhận
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateSurveyReportModal);
