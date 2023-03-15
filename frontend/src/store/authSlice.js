import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("TOKEN") || "",
  userId: localStorage.getItem("USER_ID") || "",
  isAdmin: JSON.parse(localStorage.getItem("IS_ADMIN")) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, isAdmin, id } = action.payload;
      state.token = token;
      state.isAdmin = isAdmin;
      state.userId = id;
      localStorage.setItem("TOKEN", token);
      localStorage.setItem("USER_ID", id);
      localStorage.setItem("IS_ADMIN", JSON.stringify(isAdmin));
    },
    logout: (state, action) => {
      state.token = "";
      state.isAdmin = false;
      state.userId = "";
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("USER_ID");
      localStorage.removeItem("IS_ADMIN");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
