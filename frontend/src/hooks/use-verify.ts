import { useEffect } from "react";
import { useAppDispatch } from "./use-redux-store";
import { useVerifyMutation } from "@/redux/features/user-slice";
import { login, setLoading } from "@/redux/features/auth-slice";

export default function useVerify() {
  const dispatch = useAppDispatch();

  const [verify] = useVerifyMutation();

  useEffect(() => {
    dispatch(setLoading(true));
    verify()
      .unwrap()
      .then(() => {
        dispatch(login());
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);
}
