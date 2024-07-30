import { createSlice } from "@reduxjs/toolkit";
import { ConfirmState } from "@/types/redux";

const defaultRervationFormData: ConfirmState["reservationFormData"] = {
  property: "",
  check_in: "",
  check_out: "",
  guests: 0,
};

const defaultDeletingPropertyInfo: ConfirmState["deletingPropertyInfo"] = {
  id: "",
  name: "",
};

const initialState: ConfirmState = {
  confirmType: null,
  title: "",
  message: "",
  reservationFormData: defaultRervationFormData,
  deletingPropertyInfo: defaultDeletingPropertyInfo,
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
      state.reservationFormData = defaultRervationFormData;
    },
    setDeletingPropertyInfo: (
      state,
      action: { payload: ConfirmState["deletingPropertyInfo"] },
    ) => {
      state.deletingPropertyInfo = action.payload;

    },
    clearDeletingPropertyInfo: (state) => {
      state.deletingPropertyInfo = defaultDeletingPropertyInfo;
    },
  },
});

export const {
  setConfirmHeader,
  clearConfirmHeader,
  setReservationFormData,
  clearReservationFormData,
  setDeletingPropertyInfo,
  clearDeletingPropertyInfo
} = confirmSlice.actions;
export default confirmSlice.reducer;
