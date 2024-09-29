import React from "react";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types/reservations";
import { useRouter } from "next/navigation";
import ReservationStatus from "./reservation-status";
import ReservationInfo from "./reservation-info";
import Link from "next/link";

type Props = {
  reservation: Reservation;
};

const ReservationCard = ({ reservation }: Props) => {
  const {
    image_url,
    property,
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
          sizes="( max-width: 768px ) 768px, ( max-width: 1200px ) 768px, 768px"
          className="object-cover transition duration-1000 hover:scale-110"
        />
      </div>
      <ReservationInfo {...reservation} />
      <Button onClick={onClick} className="w-full" variant={`secondary`}>
        Cancel reservation
      </Button>
      <Button onClick={onClick} className="w-full">
        <Link href={`/properties/${property}`}>Go to property</Link>
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
