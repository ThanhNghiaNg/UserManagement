import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("TOKEN") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("TOKEN", token);
    },
    logout: (state, action) => {
      state.token = "";
      localStorage.removeItem("TOKEN");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
