import { UserOutlined } from "@ant-design/icons";
import { IonFooter, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useHistory } from "react-router";
import {
  CUSTOMER_FOOTER,
  ROUTES_NON_FOOTER_HEADER,
  STAFF_FOOTER,
} from "../../utils/constant";
import { NavigateMenuEnum, SystemRole } from "../../enums";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Footer: React.FC = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(CUSTOMER_FOOTER);

  const [isShowEleCommon, setIsShowEleCommon] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );

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

  useEffect(() => {
    if (userProfileState.roleName === SystemRole.STAFF) {
      setMenu(STAFF_FOOTER);
    } else {
      setMenu(CUSTOMER_FOOTER);
    }
  }, [userProfileState]);

  return (
    <>
      {isShowEleCommon && (
        <IonFooter>
          <IonToolbar class="custome-toolbar">
            <div className="container-main">
              <div className="footer-group__button">
                {menu.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`${
                        currentPage === NavigateMenuEnum.PROFILE && "active"
                      }`}
                      onClick={() => {
                        setCurrentPage(item.value);
                        history.replace(item.value);
                      }}
                    >
                      {item.icon}
                      <div>{item.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </>
  );
};

export default Footer;
