import {
  FileTextOutlined,
  HomeFilled,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IonFooter, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useHistory } from "react-router";
import { END_POINTS, ROUTES_NON_FOOTER_HEADER } from "../../utils/constant";

const Footer: React.FC = () => {
  const history = useHistory();
  const [isShowEleCommon, setIsShowEleCommon] = useState(false);

  useEffect(() => {
    const unListen = history.listen(async () => {
      const pathName = history.location.pathname;
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
        <IonFooter>
          <IonToolbar class="custome-toolbar">
            <div className="container-main">
              <div className="footer-group__button">
                <button
                  className="active"
                  onClick={() => history.replace(END_POINTS.CUSTOMER_ROLE.HOME)}
                >
                  <HomeFilled />
                  <div>Trang chủ</div>
                </button>
                <button
                  onClick={() =>
                    history.replace(END_POINTS.CUSTOMER_ROLE.CONTRACT)
                  }
                >
                  <FileTextOutlined />
                  <div>Hợp đồng</div>
                </button>
                <button
                  onClick={() =>
                    history.replace(END_POINTS.CUSTOMER_ROLE.SURVEY)
                  }
                >
                  <PhoneOutlined />
                  <div>Khảo sát</div>
                </button>
                <button>
                  <UserOutlined />
                  <div>Tài khoản</div>
                </button>
              </div>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </>
  );
};

export default Footer;
