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
import { Input } from "@/components/ui/input";
import { useConfirmProperty } from "@/hooks/use-confirm-property";
import { useConfirmReservation } from "@/hooks/use-confirm-reservation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { useDeleteMessageMutation } from "@/redux/features/chat-slice";
import {
  clearDeletingPropertyInfo,
  clearReservationFormData,
} from "@/redux/features/confirm-slice";
import { closeModal } from "@/redux/features/modal-slice";
import { toast } from "sonner";

type Props = {};

export default function ConfirmModal({}: Props) {
  const {
    message,
    title,
    confirmType,
    deletingPropertyInfo,
    reservationFormData,
    messageId,
  } = useAppSelector((state) => state.confirm);
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const isModalOpen = isOpen && type === "confirm";
  const dispatch = useAppDispatch();

  const { onAddReservation, reservationContent } = useConfirmReservation({
    reservationFormData,
  });
  const { onDeleteProperty, isLoading, disable, onChange } = useConfirmProperty(
    { deletingPropertyInfo, confirmType },
  );

  const [deleteMessage] = useDeleteMessageMutation();

  const onClose = () => {
    dispatch(closeModal());
    dispatch(clearReservationFormData());
    dispatch(clearDeletingPropertyInfo());
  };

  const onSubmit = () => {
    if (confirmType === "add-reservation") {
      return onAddReservation();
    }
    if (confirmType === "delete-property") {
      return onDeleteProperty();
    }
    if (confirmType === "delete-message") {
      return deleteMessage(messageId).unwrap().then(() => {
        dispatch(closeModal());
      }).catch((err) => {
        console.log(err);
        toast.error("Failed to delete message");
      });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex flex-col text-center">
            {message} <br />
            {confirmType === "add-reservation" && (
              <span className="font-semibold">{reservationContent}</span>
            )}
            {confirmType === "delete-property" && (
              <>
                Please type the property's name below for confirmation
                <span className="mb-4 font-semibold">
                  "{deletingPropertyInfo.name}"
                </span>
                <Input placeholder={"Property's name"} onChange={onChange} />
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-4">
            <Button
              className="w-full"
              onClick={onClose}
              size={"lg"}
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button
              className="w-full"
              onClick={onSubmit}
              size={"lg"}
              disabled={disable || isLoading}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
