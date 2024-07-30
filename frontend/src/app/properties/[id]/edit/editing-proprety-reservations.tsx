"use client";

import { ShortenReservation } from "@/types/reservations";
import React from "react";
import EditingPropertyReservationCard from "./edit-property-reservation-card";
import NoReservationFound from "./no-reservation-found";

type Props = {
  reservations: ShortenReservation[];
};

export default function EditingPropertyReservations({ reservations }: Props) {
  if (!reservations || reservations.length === 0) return <NoReservationFound />;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-bold">Reservations</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {reservations.map((reservation) => (
          <EditingPropertyReservationCard
            key={reservation.id}
            id={reservation.id}
          />
        ))}
      </div>
    </div>
  );
}
