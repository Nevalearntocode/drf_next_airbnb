import { ModalState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  property: undefined,
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
    },
    setProperty: (state, action: { payload: ModalState["property"] }) => {
      state.property = action.payload;
    },
    clearProperty: (state) => {
      state.property = undefined;
    },
  },
});

export const { openModal, closeModal, setProperty, clearProperty } =
  modalSlice.actions;
export default modalSlice.reducer;
