import { AuthState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
};

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
    setUser: (state, action: { payload: AuthState["user"] }) => {
      state.user = action.payload;
    }
  },
});

export const { setLoading, setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
