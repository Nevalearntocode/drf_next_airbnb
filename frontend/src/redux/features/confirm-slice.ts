import { createSlice } from "@reduxjs/toolkit";
import { ConfirmState } from "@/types/redux";

const initialState: ConfirmState = {
  confirmType: null,
  title: "",
  message: "",
  reservationFormData: undefined,
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    setConfirmHeader: (
      state,
      action: {
        payload: {
          confirmType: ConfirmState["confirmType"];
          title: ConfirmState["title"];
          message: ConfirmState["message"];
        };
      },
    ) => {
      state.confirmType = action.payload.confirmType;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    clearConfirmHeader: (state) => {
      state.title = "";
      state.message = "";
      state.confirmType = null;
    },
    setReservationFormData: (
      state,
      action: { payload: ConfirmState["reservationFormData"] },
    ) => {
      state.reservationFormData = action.payload;
    },
    clearReservationFormData: (state) => {
      state.reservationFormData = undefined;
    },
  },
});

export const {
  setConfirmHeader,
  clearConfirmHeader,
  setReservationFormData,
  clearReservationFormData,
} = confirmSlice.actions;
export default confirmSlice.reducer;
