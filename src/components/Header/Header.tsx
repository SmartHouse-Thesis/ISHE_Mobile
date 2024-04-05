import {
  BellOutlined,
  CaretLeftFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { useHistory } from "react-router";
import { END_POINTS, ROUTES_NON_FOOTER_HEADER } from "../../utils/constant";

const Header: React.FC = () => {
  const history = useHistory();
  const [titleBack, setTitleBack] = useState("");
  const [isShowBtnBack, setIsShowBtnBack] = useState(false);
  const [isShowEleCommon, setIsShowEleCommon] = useState(false);

  useEffect(() => {
    const unListen = history.listen(async () => {
      const pathName = history.location.pathname;
      const { title } = (history.location.state as { title: string }) || {
        title: "",
      };
      if (pathName.indexOf(END_POINTS.CUSTOMER_ROLE.PACKAGE) > -1)
        setIsShowBtnBack(true);
      else setIsShowBtnBack(false);

      title && setTitleBack(title);

      if (
        ROUTES_NON_FOOTER_HEADER.findIndex((x) => pathName.indexOf(x) > -1) > -1
      )
        setIsShowEleCommon(true);
      else setIsShowEleCommon(false);
    });

    return () => unListen();
  }, [history]);

  return (
    <>
      {isShowEleCommon && (
        <IonHeader className="header-wrapper">
          <IonToolbar className="custome-toolbar">
            {isShowBtnBack ? (
              <IonButtons slot="start">
                <IonButton
                  className="btn-back title-page"
                  onClick={() => history.replace(END_POINTS.CUSTOMER_ROLE.HOME)}
                >
                  <CaretLeftFilled className="icon-back" />
                  {titleBack}
                </IonButton>
              </IonButtons>
            ) : (
              <IonTitle slot="start" class="title-page container-main">
                Smart Home
              </IonTitle>
            )}

            <IonButtons slot="end">
              <IonButton>
                <ShoppingCartOutlined className="icon-custome" />
              </IonButton>
              <IonButton>
                <BellOutlined className="icon-custome" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      )}
    </>
  );
};

export default Header;
