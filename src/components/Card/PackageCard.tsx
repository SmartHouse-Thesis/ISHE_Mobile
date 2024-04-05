import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import "./PackageCard.css";
import useConvert from "../../hooks/useConvert";
import { useHistory } from "react-router";
import { END_POINTS } from "../../utils/constant";
import {
  DevicePackageTypes,
  SmartDevicePackageItemTypes,
} from "../../api/DevicePackage/type";
import { Image } from "antd";

interface Props {
  lstData?: DevicePackageTypes[];
  className?: string;
  isShowBtnMore?: boolean;

  smartDevices?: SmartDevicePackageItemTypes[];
}

const ComboCard: React.FC<Props> = ({
  lstData,
  isShowBtnMore = false,
  smartDevices = [],
}) => {
  const convert = useConvert();
  const history = useHistory();

  const goToDetailPackage = (item: DevicePackageTypes) => {
    history.replace(`${END_POINTS.CUSTOMER_ROLE.PACKAGE}/${item.id}`, {
      title: item.name,
    });
  };

  return (
    <div className="package-card__list">
      {lstData?.map((item) => (
        <IonCard
          className="package-card__item"
          key={item.id}
          onClick={() => goToDetailPackage(item)}
        >
          <Image src={item.images[0].url} alt="device-package-alt" />
          <IonCardHeader>
            <IonCardTitle>{convert.toMoney(item.price) || 0}</IonCardTitle>
            <p className="package-card__desc">
              {item.description}
              {isShowBtnMore && (
                <a
                  style={{
                    marginTop: 10,
                    textAlign: "right",
                    marginLeft: 10,
                  }}
                >
                  Xem thêm
                </a>
              )}
            </p>
            <IonCardSubtitle>{item.name.slice(0, 35) + "..."}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      ))}
      {smartDevices?.length > 0 &&
        smartDevices?.map((item) => {
          const device = item.smartDevice;
          return (
            <IonCard className="package-card__item" key={device.id}>
              <Image src={device.image} alt="device-package-alt" />
              <IonCardHeader>
                <IonCardTitle>
                  {convert.toMoney(device.price) || 0}
                </IonCardTitle>
                <p className="package-card__desc">{device.name}</p>
              </IonCardHeader>
            </IonCard>
          );
        })}
    </div>
  );
};

export default ComboCard;
