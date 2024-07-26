import { useEffect } from "react";
import { useAppDispatch } from "./use-redux-store";
import {
  useVerifyMutation,
} from "@/redux/features/user-slice";
import { setLoading, setAuth } from "@/redux/features/auth-slice";

export const useVerify = () => {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();

  useEffect(() => {
    dispatch(setLoading(true));
    verify()
      .unwrap()
      .then(() => {
        dispatch(setAuth(true));
      })
      .catch((err) => {
        dispatch(setAuth(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [verify, dispatch]);
}
