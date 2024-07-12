import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./features/modal-slice";
import { userSlice } from "./features/user-slice";
import { propertySlice } from "./features/property-slice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    [userSlice.reducerPath]: userSlice.reducer,
    property: propertySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware),
  
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
