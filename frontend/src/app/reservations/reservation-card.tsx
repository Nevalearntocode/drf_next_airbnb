import React from "react";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types/reservations";
import { useRouter } from "next/navigation";

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
      <div className="flex flex-col justify-between space-y-2">
        <h2 className="mb-4 text-xl">{property_name}</h2>
        <p className="flex items-center justify-between">
          <span className="font-bold">Check in date: </span>
          {check_in}
        </p>
        <p className="flex items-center justify-between">
          <span className="font-bold">Check out date: </span>
          {check_out}
        </p>
        <p className="flex items-center justify-between">
          <span className="font-bold">Number of nights: </span> {nights}
        </p>
        <p className="flex items-center justify-between">
          <span className="font-bold">Total price: </span>${total}
        </p>
        <Button onClick={onClick}>Go to property</Button>
      </div>
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
