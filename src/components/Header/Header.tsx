import { BellOutlined, CaretLeftFilled, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { useHistory } from "react-router";
import { END_POINTS, ROUTES_NON_FOOTER_HEADER } from "../../utils/constant";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Dropdown, MenuProps } from "antd";

const Header: React.FC = () => {
  const history = useHistory();
  const [titleBack, setTitleBack] = useState("");
  const [isShowBtnBack, setIsShowBtnBack] = useState(false);
  const [isShowEleCommon, setIsShowEleCommon] = useState(false);
  const userProfileState = useSelector((selector: RootState) => selector.userProfile.profile);

  useEffect(() => {
    const unListen = history.listen(async () => {
      const pathName = history.location.pathname;
      const { title } = (history.location.state as { title: string }) || {
        title: "",
      };
      if (pathName.indexOf(END_POINTS.CUSTOMER_ROLE.PACKAGE) > -1) setIsShowBtnBack(true);
      else setIsShowBtnBack(false);

      title && setTitleBack(title);

      if (ROUTES_NON_FOOTER_HEADER.findIndex((x) => pathName.indexOf(x) > -1) > -1) setIsShowEleCommon(true);
      else setIsShowEleCommon(false);
    });

    return () => unListen();
  }, [history]);

  const onBackToHomePage = () => {
    userProfileState.status.toLowerCase() === "staff" ? history.push(END_POINTS.STAFF_ROLE.SURVEY_REPORT) : history.push(END_POINTS.CUSTOMER_ROLE.HOME);
  };

  const items: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
  ];

  return (
    <>
      {isShowEleCommon && (
        <IonHeader className="header-wrapper">
          <IonToolbar className="custome-toolbar">
            {isShowBtnBack ? (
              <IonButtons slot="start">
                <IonButton className="btn-back title-page">
                  <CaretLeftFilled className="icon-back" />
                  {titleBack}
                </IonButton>
              </IonButtons>
            ) : (
              <IonTitle slot="start" class="title-page container-main" onClick={onBackToHomePage}>
                Smart Home
              </IonTitle>
            )}

            <IonButtons slot="end">
              <Dropdown menu={{ items }}>
                <IonButton>
                  <BellOutlined className="icon-custome" />
                </IonButton>
              </Dropdown>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      )}
    </>
  );
};

export default Header;
