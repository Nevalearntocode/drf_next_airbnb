import { createSlice } from "@reduxjs/toolkit";
import { ConfirmState } from "@/types/redux";

const initialState: ConfirmState = {
  data: {},
  confirmType: null,
  title: "",
  message: "",
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    setConfirmHeader: (state, action: { payload: ConfirmState }) => {
      state.confirmType = action.payload.confirmType;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.data = action.payload.data ?? {};
    },
    clearConfirmHeader: (state) => {
      state.title = "";
      state.message = "";
      state.confirmType = null;
      state.data = {};
    },
  },
});

export const { setConfirmHeader, clearConfirmHeader } = confirmSlice.actions;
export default confirmSlice.reducer;
