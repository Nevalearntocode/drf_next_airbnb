import React from "react";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types/reservations";
import { useRouter } from "next/navigation";
import ReservationStatus from "./reservation-status";

type Props = {
  reservation: Reservation;
};

const ReservationCard = ({ reservation }: Props) => {
  const {
    image_url,
    check_in,
    check_out,
    total,
    property,
    property_name,
    nights,
    guests,
    status,
  } = reservation;

  const router = useRouter();

  const onClick = () => {
    router.push(`/properties/${property}`);
  };

  return (
    <div className="relative mt-4 grid grid-cols-1 gap-4 rounded-xl border border-gray-300 p-5 shadow-md lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={image_url}
          alt={"modern"}
          fill
          className="object-cover transition duration-1000 hover:scale-110"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex">
          <h2 className="mb-4 text-xl font-bold">{property_name}</h2>
        </div>
        <div className="relative flex h-full flex-col gap-4">
          <p className="flex items-center justify-between">
            <span className="font-semibold">Check in date: </span>
            {check_in}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-semibold">Check out date: </span>
            {check_out}
          </p>
          <p className="flex items-center justify-between">
            <span className="font-semibold">Number of nights: </span> {nights}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Status: </span>
            <ReservationStatus status={status} />
          </div>
          <p className="absolute bottom-0 flex w-full items-center justify-between">
            <span className="font-semibold">Total price: </span>${total}
          </p>
        </div>
      </div>
      <Button onClick={onClick} className="w-full" variant={`secondary`}>
        Cancel reservation
      </Button>
      <Button onClick={onClick} className="w-full">
        Go to property
      </Button>
      <Button
        variant={`ghost`}
        className="absolute right-0 top-0 hidden items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0 lg:flex"
        size={"icon"}
        onClick={onClick}
      >
        <SquareArrowOutUpRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ReservationCard;
