"use client";

import { ConfirmState } from "@/types/redux";
import { useAppDispatch } from "./use-redux-store";
import { useDeletePropertyMutation } from "@/redux/features/property-slice";
import { clearDeletingPropertyInfo } from "@/redux/features/confirm-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { closeModal } from "@/redux/features/modal-slice";
import { useEffect, useState } from "react";

type Props = {
  deletingPropertyInfo: ConfirmState["deletingPropertyInfo"];
  confirmType: ConfirmState["confirmType"];
};

export const useConfirmProperty = ({
  deletingPropertyInfo,
  confirmType,
}: Props) => {
  const dispatch = useAppDispatch();
  const [deleteProperty, { isLoading }] = useDeletePropertyMutation();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (confirmType === "delete-property") {
      setDisable(inputValue !== deletingPropertyInfo.name);
    } else {
      setDisable(false);
    }
  }, [inputValue, confirmType, deletingPropertyInfo.name]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onDeleteProperty = () => {
    deleteProperty({ id: deletingPropertyInfo.id })
      .unwrap()
      .then(() => {
        dispatch(clearDeletingPropertyInfo());
        toast.success("Property deleted successfully");
        router.push("/properties/me");
      })
      .catch((err) => {
        toast.error("Failed to delete property");
      });
    dispatch(closeModal());
  };

  return {
    onDeleteProperty,
    isLoading,
    onChange,
    disable,
  };
};
