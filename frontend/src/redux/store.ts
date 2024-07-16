import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal-slice";
import { userSlice } from "./features/user-slice";
import { propertySlice } from "./features/property-slice";
import authReducer from "./features/auth-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    property: propertySlice.reducer,
    auth: authReducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
