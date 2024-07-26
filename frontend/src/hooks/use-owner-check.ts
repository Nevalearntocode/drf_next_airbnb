"use client";

import { useAppSelector } from "./use-redux-store";

export const useOwnerCheck = (propertyOwnerId: string) => {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const isOwner = user?.id === propertyOwnerId;
  return { isOwner, isAuthenticated, isLoading };
};
