import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserProfileTypes } from "../types";

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    id: "",
    phoneNumber: "",
    fullName: "",
    email: "",
    avatar: null,
    roleName: "",
    status: "",
    createAt: "",
  },
  reducers: {
    updateUserProfile: (state, action: PayloadAction<UserProfileTypes>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
