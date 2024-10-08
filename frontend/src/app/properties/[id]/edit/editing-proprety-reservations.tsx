"use client";

import { ShortenReservation } from "@/types/reservations";
import React from "react";
import EditingPropertyReservationCard from "./edit-property-reservation-card";
import NoReservationFound from "./no-reservation-found";
import { PropertyWithLandlordAndReservation } from "@/types/property";

type Props = {
  propertyDetail: PropertyWithLandlordAndReservation;
};

export default function EditingPropertyReservations({ propertyDetail }: Props) {
  const { reservations } = propertyDetail;

  if (!reservations || reservations.length === 0) return <NoReservationFound />;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h2 className="text-2xl font-bold">Reservations</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {reservations.map((reservation) => (
          <EditingPropertyReservationCard
            key={reservation.id}
            id={reservation.id}
            property={propertyDetail}
          />
        ))}
      </div>
    </div>
  );
}
