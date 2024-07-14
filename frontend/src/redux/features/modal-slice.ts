import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  type: "login" | "register" | "add-property" | "edit-property";
}

const initialState = {
  isOpen: false,
  type: "login",
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
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
