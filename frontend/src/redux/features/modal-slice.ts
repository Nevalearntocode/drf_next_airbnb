import { ModalState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  property: undefined,
  reservations: [],
  reservationId: "",
} as ModalState;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: { payload: ModalState["type"] }) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.reservations = [];
      state.reservationId = "";
    },
    setReservations: (
      state,
      action: { payload: ModalState["reservations"] },
    ) => {
      state.reservations = action.payload;
    },
    setReservationId: (
      state,
      action: { payload: ModalState["reservationId"] },
    ) => {
      state.reservationId = action.payload;
    },
  },
});

export const { openModal, closeModal, setReservations, setReservationId } =
  modalSlice.actions;
export default modalSlice.reducer;
