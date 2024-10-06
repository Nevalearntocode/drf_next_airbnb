import React from "react";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types/reservations";
import { useRouter } from "next/navigation";
import ReservationInfo from "./reservation-info";
import { useAppDispatch } from "@/hooks/use-redux-store";
import {
  setConfirmHeader,
  setDeleteReservationId,
} from "@/redux/features/confirm-slice";
import {
  openModal,
  setReservationId,
  setReservations,
} from "@/redux/features/modal-slice";
import { useGetPropertyDetailsQuery } from "@/redux/features/property-slice";

type Props = {
  reservation: Reservation;
};

const ReservationCard = ({ reservation }: Props) => {
  const { image_url, property, id } = reservation;
  const { data: propertyDetail } = useGetPropertyDetailsQuery({ id: property });

  const router = useRouter();

  const dispatch = useAppDispatch();

  if (!propertyDetail) {
    return null;
  }

  const { reservations } = propertyDetail;

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

  const onClick = () => {
    router.push(`/properties/${property}`);
  };

  const onChangeSchedule = () => {
    dispatch(openModal("update-reservation"));
    dispatch(setReservations(reservations));
    dispatch(setReservationId(id));
  };

  return (
    <div className="relative mt-4 grid grid-cols-1 gap-4 rounded-xl border border-gray-300 p-5 shadow-md lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={image_url}
          alt={"modern"}
          fill
          sizes="( max-width: 768px ) 768px, ( max-width: 1200px ) 768px, 768px"
          className="object-cover transition duration-1000 hover:scale-110"
        />
      </div>
      <ReservationInfo {...reservation} />
      <Button
        onClick={onCancelReservation}
        className="w-full"
        variant={`secondary`}
      >
        Cancel reservation
      </Button>
      <Button onClick={onChangeSchedule} className="w-full">
        Change schedule
      </Button>
      <Button
        variant={`ghost`}
        className="absolute right-0 top-0 items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 lg:flex"
        size={"icon"}
        onClick={onClick}
      >
        <SquareArrowOutUpRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ReservationCard;
