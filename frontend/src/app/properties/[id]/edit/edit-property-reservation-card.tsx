"use client";

import ReservationInfo from "@/app/reservations/reservation-info";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import {
  useCreateConversationMutation,
  useGetConversationsQuery,
} from "@/redux/features/chat-slice";
import {
  setConfirmHeader,
  setDeleteReservationId,
} from "@/redux/features/confirm-slice";
import {
  openModal,
  setReservationId,
  setReservations,
} from "@/redux/features/modal-slice";
import { useGetReservationDetailsQuery } from "@/redux/features/reservation-slice";
import { apiSlice } from "@/redux/services/api-slice";
import { PropertyWithLandlordAndReservation } from "@/types/property";
import { format } from "date-fns";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  property: PropertyWithLandlordAndReservation;
};

export default function EditingPropertyReservationCard({
  id,
  property,
}: Props) {
  const { data: reservation } = useGetReservationDetailsQuery({ id });
  const { data: conversations } = useGetConversationsQuery();
  const [createConversation] = useCreateConversationMutation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reservations } = property;

  if (!reservation) return null;

  const { guest } = reservation;

  const conversation = conversations?.find(
    (conversation) =>
      (conversation.initiator.id === user?.id &&
        conversation.receptitor.id === guest.id) ||
      (conversation.receptitor.id === user?.id &&
        conversation.initiator.id === guest.id),
  );

  const onCancelReservation = () => {
    dispatch(setDeleteReservationId(id));
    dispatch(openModal("confirm"));
    dispatch(
      setConfirmHeader({
        title: "Cancel Reservation",
        confirmType: "cancel-reservation",
        message: "Are you sure you want to cancel this reservation?",
      }),
    );
  };

  const onChangeSchedule = () => {
    dispatch(openModal("update-reservation"));
    dispatch(setReservations(reservations));
    dispatch(setReservationId(id));
  };

  const onContact = () => {
    if (conversation) {
      router.push(`/conversations/?conversation=${conversation.id}`);
    } else {
      createConversation({ receptitor: guest.id })
        .unwrap()
        .then((res) => {
          dispatch(
            apiSlice.util.invalidateTags([
              { type: "Conversations", id: "LIST" },
            ]),
          );
          router.push(`/conversations/?conversation=${res.id}`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to contact guest");
        });
    }
  };

  return (
    <div className="relative mt-4 flex flex-col gap-4 rounded-xl border border-gray-300 p-5 shadow-md">
      <ReservationInfo {...reservation} property_name={guest.name} />
      <div className="flex items-center justify-between gap-8">
        <Button
          className="w-full"
          variant={`secondary`}
          onClick={onCancelReservation}
        >
          Cancel
        </Button>
        <Button className="w-full" onClick={onChangeSchedule}>
          Change Schedule
        </Button>
        <Button variant={`outline`} className="w-full" onClick={onContact}>
          Contact
        </Button>
      </div>
    </div>
  );
}
