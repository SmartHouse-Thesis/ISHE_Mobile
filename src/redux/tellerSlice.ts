import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StaffItemTypes, TellerItemTypes } from "../types";

export const tellerSlice = createSlice({
  name: "tellers",
  initialState: {
    account: {
      accountId: "",
      phoneNumber: "",
      roleName: "",
      fullName: "",
      email: "",
      avatar: null,
      status: "",
      createAt: "",
    },
  },
  reducers: {
    selectChatWithStaff: (state, action: PayloadAction<TellerItemTypes>) => {
      state.account = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectChatWithStaff } = tellerSlice.actions;

export default tellerSlice.reducer;
