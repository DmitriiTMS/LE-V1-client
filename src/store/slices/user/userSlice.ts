import { createSlice } from "@reduxjs/toolkit";
import { AuthResponse } from "../../../types/types";
import ApiService from "../../../service/ApiService";

const initialState: AuthResponse = {
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      ApiService.clearAuth()
      state.auth = false;
  
    },
  },
});

export default userSlice.reducer;
export const { addUser, logout } = userSlice.actions;
