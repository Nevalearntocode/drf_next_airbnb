import { configureStore } from "@reduxjs/toolkit";
import { reservationSlice } from "./features/reservation-slice";
import { propertySlice } from "./features/property-slice";
import { r2Slice } from "./features/r2-slice";
import { userSlice } from "./features/user-slice";
import authReducer from "./features/auth-slice";
import modalReducer from "./features/modal-slice";
import confirmReducer from "./features/confirm-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    confirm: confirmReducer,
    property: propertySlice.reducer,
    reservation: reservationSlice.reducer,
    [r2Slice.reducerPath]: r2Slice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userSlice.middleware)
      .concat(r2Slice.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
