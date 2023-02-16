import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest, refreshTokenRequest } from "../../../api/users";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../config/constants";

const initialState = {
  userInfo: {},
  loading: false,
  error: "",
};

export const login = createAsyncThunk("users/login", (user) => {
  const token = loginRequest(user);
  return token;
});

export const refreshToken = createAsyncThunk(
  "users/refreshToken",
  refreshTokenRequest
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);

      localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
      console.log(localStorage.getItem(REFRESH_TOKEN));
      return { ...state, loading: false, userInfo: action.payload.token };
    });
    builder.addCase(login.rejected, (state, action) => {
      return { userInfo: {}, loading: false, error: action.error.message };
    });

    // refreshToken
    builder.addCase(refreshToken.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      console.log(action);
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      return { ...state, loading: false, userInfo: action.payload.token };
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      return { userInfo: {}, loading: false, error: action.error.message };
    });
  },
});

export default usersSlice.reducer;
