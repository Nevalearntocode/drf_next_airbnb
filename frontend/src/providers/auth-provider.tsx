"use client";

import { useEffect } from "react";
import { useVerify } from "@/hooks/use-verify";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { setUser } from "@/redux/features/auth-slice";
import { useRetrieveUserQuery } from "@/redux/features/user-slice";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useVerify();

  const { data } = useRetrieveUserQuery();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (data && isAuthenticated) {
      dispatch(setUser(data));
    } else {
      dispatch(setUser(undefined));
    }
  }, [data, dispatch, isAuthenticated]);

  return <>{children}</>;
};
