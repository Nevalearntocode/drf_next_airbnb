"use client";

import Counter from "@/components/form/counter";
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

export default function GuestModal({}: Props) {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const isModalOpen = isOpen && type === "guests";

  const dispatch = useAppDispatch();
  const [guests, setGuests] = React.useState(1);
  const onClose = () => {
    dispatch(closeModal());
  };

  const onConfirm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("guests", guests.toString());
    window.history.replaceState({}, "", url.toString());
    onClose();
  };

  const onClear = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("guests");
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select number of guests</DialogTitle>
        </DialogHeader>
        <Counter
          onChange={setGuests}
          subtitle="How many friends are you bringing with?"
          title=""
          value={guests}
        />
        <DialogFooter>
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
