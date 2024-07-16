import { AuthState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuth: (state, action: { payload: boolean }) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setLoading, setAuth } = authSlice.actions;
export default authSlice.reducer;
