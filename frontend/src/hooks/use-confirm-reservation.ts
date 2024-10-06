"use client";

import { useAddReservationMutation } from "@/redux/features/reservation-slice";
import { useAppDispatch } from "./use-redux-store";
import { toast } from "sonner";
import {
  clearConfirmHeader,
  clearReservationFormData,
} from "@/redux/features/confirm-slice";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { closeModal } from "@/redux/features/modal-slice";
import { ConfirmState } from "@/types/redux";

type Props = {
  reservationFormData: ConfirmState["reservationFormData"];
};

export const useConfirmReservation = ({ reservationFormData }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addReservation] = useAddReservationMutation();

  const onAddReservation = () => {
    addReservation({ ...reservationFormData })
      .unwrap()
      .then(() => {
        toast.success("Reservation added successfully");
        dispatch(clearConfirmHeader());
        dispatch(closeModal());
        dispatch(clearReservationFormData());
        router.push("/reservations/me");
      })
      .catch((err) => {
        console.log(err);
        if (err.data) {
          if (Array.isArray(err.data)) {
            for (const field in err.data) {
              err.data[field].forEach((errorMessage: string) => {
                toast.error(errorMessage);
              });
            }
          } else {
            console.error(err.data);
            toast.error(err.data.non_field_errors[0]);
          }
        } else {
          console.error(err);
          toast.error("Failed to add reservation");
        }
      });
  };

  const reservationContent =
    reservationFormData.check_in !== "" && reservationFormData.check_out !== ""
      ? `from ${format(reservationFormData.check_in, "EEEE dd MMMM")} to ${format(
          reservationFormData.check_out,
          "EEEE dd MMMM",
        )}`
      : "Please select the check-in and check-out dates";

  return {
    onAddReservation,
    reservationContent,
  };
};
