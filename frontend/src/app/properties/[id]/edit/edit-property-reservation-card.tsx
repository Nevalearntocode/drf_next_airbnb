"use client";

import ReservationInfo from "@/app/reservations/reservation-info";
import { Button } from "@/components/ui/button";
import { useGetReservationDetailsQuery } from "@/redux/features/reservation-slice";
import { format } from "date-fns";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
};

export default function EditingPropertyReservationCard({ id }: Props) {
  const { data: reservation } = useGetReservationDetailsQuery({ id });

  if (!reservation) return null;

  const { guest, property } = reservation;

  return (
    <div className="relative mt-4 flex flex-col gap-4 rounded-xl border border-gray-300 p-5 shadow-md">
      <ReservationInfo {...reservation} property_name={guest.name} />
      <div className="flex items-center justify-between gap-8">
        <Button className="w-full" variant={`secondary`}>
          Cancel
        </Button>
        <Button className="w-full">
          <Link href={`/properties/${property.id}`}>Contact</Link>
        </Button>
      </div>
    </div>
  );
}
