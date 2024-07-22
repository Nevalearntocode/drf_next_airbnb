"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { clearProperty, openModal } from "@/redux/features/modal-slice";
import { Globe } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {};

const AddPropertyButton = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const onClick = () => {
    if (!isAuthenticated) {
      dispatch(openModal("login"));
      toast.info("Please login to add property");
    } else {
      dispatch(openModal("add-property"));
      dispatch(clearProperty());
    }
  };

  return (
    <div className="p-2 text-sm">
      <Button className="rounded-full" onClick={onClick}>
        <p>Airbnb your home</p>
        <Globe className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default AddPropertyButton;
