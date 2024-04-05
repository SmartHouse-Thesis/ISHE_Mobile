export const END_POINTS = {
  AUTHENTICATION: {
    LOGIN: "/api/auth/sign-in",
    SIGN_UP: "/api/auth/sign-up",
  },
  CUSTOMER_ROLE: {
    HOME: "/customer-role/home",
    PACKAGE: "/customer-role/packages",
    PACKAGE_DETAIL: "/customer-role/packages/:id",
    CONTRACT: "/customer-role/contracts",
    SURVEY: "/customer-role/survey",
  },
};

export const END_POINTS_API = {
  SIGN_IN: "/api/auth",
  PACKAGES: {
    GET_ALL: "/api/device-packages",
  },

  CUSTOMER_ROLE: {
    SIGN_UP: "/api/customers",
  },

  CONTRACTS: "/api/contracts",
  SURVEY: "/api/survey-requests",
  FEEDBACK: "/api/feedbacks",
};

export const ROUTES_NON_FOOTER_HEADER = [
  END_POINTS.CUSTOMER_ROLE.HOME,
  END_POINTS.CUSTOMER_ROLE.PACKAGE,
  END_POINTS.CUSTOMER_ROLE.CONTRACT,
  END_POINTS.CUSTOMER_ROLE.SURVEY,
];

export const CUSTOMER_ID = "ba192f6f-e0fb-46f4-b427-4cb324f6538c";
