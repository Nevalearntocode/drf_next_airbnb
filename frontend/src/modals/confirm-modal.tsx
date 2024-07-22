"use client";

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
import { clearConfirmHeader } from "@/redux/features/confirm-slice";
import { closeModal } from "@/redux/features/modal-slice";
import { useAddReservationMutation } from "@/redux/features/reservation-slice";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {};

export default function ConfirmModal({}: Props) {
  const { message, title, confirmType, reservationFormData } = useAppSelector(
    (state) => state.confirm,
  );
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [addReservation] = useAddReservationMutation();
  const isModalOpen = isOpen && type === "confirm";
  const router = useRouter();

  const onClose = () => {
    dispatch(closeModal());
  };

  const onAddReservation = () => {
    if (!reservationFormData) {
      toast.error("Something went wrong");
      return;
    }
    addReservation({ ...reservationFormData })
      .unwrap()
      .then(() => {
        toast.success("Reservation added successfully");
        dispatch(clearConfirmHeader());
        dispatch(closeModal());
        router.push("/reservations/me");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add reservation");
      });
  };

  const onSubmit = () => {
    if (confirmType === "add-reservation") {
      return onAddReservation();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-center leading-8">
            {message} <br />{" "}
            {reservationFormData &&
              confirmType === "add-reservation" &&
              `from ${format(reservationFormData.check_in, "EEEE dd MMMM")} to ${format(
                reservationFormData.check_out,
                "EEEE dd MMMM",
              )}`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-3">
            <Button
              className="w-1/3"
              onClick={onClose}
              size={"lg"}
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button className="w-1/3" onClick={onSubmit} size={"lg"}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
