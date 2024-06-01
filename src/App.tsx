import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PackageDetail from "./pages/PackageDetail/PackageDetail";
import React from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./global.css";
import { END_POINTS } from "./utils/constant";
import CustomerContract from "./pages/Contract";
import Surveys from "./pages/surveys";
import UserProfile from "./pages/profile";
import SurveyReports from "./pages/Report";
import StaffContract from "./pages/StaffContract";
import StaffSurvey from "./pages/StaffSurvey";
import CustomerChat from "./pages/Chat";
import ChatDetail from "./pages/Chat/ChatDetail";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Header />
      <IonContent class="ion-padding">
        <Route exact path={END_POINTS.CUSTOMER_ROLE.CONTRACT}>
          <CustomerContract />
        </Route>

        <Route exact path={END_POINTS.CUSTOMER_ROLE.HOME}>
          <Home />
        </Route>

        <Route exact path={END_POINTS.STAFF_ROLE.SURVEY_REPORT}>
          <SurveyReports />
        </Route>

        <Route exact path={END_POINTS.STAFF_ROLE.CONTRACT}>
          <StaffContract />
        </Route>

        <Route exact path={END_POINTS.STAFF_ROLE.SURVEY_REQUEST}>
          <StaffSurvey />
        </Route>

        <Route exact path={END_POINTS.USER_PROFILE}>
          <UserProfile />
        </Route>

        <Route exact path={END_POINTS.CUSTOMER_ROLE.SURVEY}>
          <Surveys />
        </Route>

        <Route exact path={END_POINTS.CUSTOMER_ROLE.PACKAGE_DETAIL}>
          <PackageDetail />
        </Route>
        <Route exact path={END_POINTS.AUTHENTICATION.LOGIN}>
          <Login />
        </Route>
        <Route exact path={END_POINTS.AUTHENTICATION.SIGN_UP}>
          <Register />
        </Route>
        <Route exact path="/">
          <Redirect to={END_POINTS.AUTHENTICATION.LOGIN} />
        </Route>

        <Route exact path={END_POINTS.CUSTOMER_ROLE.CHAT}>
          <CustomerChat />
        </Route>
        <Route exact path={END_POINTS.CUSTOMER_ROLE.CHAT_DETAiL}>
          <ChatDetail />
        </Route>
      </IonContent>
      <Footer />
    </IonReactRouter>
  </IonApp>
);

export default App;
