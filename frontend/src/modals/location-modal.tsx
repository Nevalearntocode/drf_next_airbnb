"use client";

import SelectLocation from "@/components/select-location";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { closeModal } from "@/redux/features/modal-slice";
import React from "react";

type Props = {};

export default function LocationModal({}: Props) {
  const [value, setValue] = React.useState("");
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = type === "location" && isOpen;
  const onClose = () => {
    dispatch(closeModal());
  };

  const onConfirm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("location", value);
    window.history.replaceState({}, "", url.toString());
    onClose();
  };

  const onClear = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("location");
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
          <DialogDescription>
            Select the country where you want to book a reservation
          </DialogDescription>
        </DialogHeader>
        <SelectLocation setValue={setValue} value={value} />
        <DialogFooter className="mt-12">
          <div className="flex w-full justify-between gap-8">
            <Button variant={"outline"} onClick={onClear} className="w-full">
              Clear location
            </Button>
            <Button className="w-full" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
