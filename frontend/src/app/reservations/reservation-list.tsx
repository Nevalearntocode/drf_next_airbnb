"use client";

import React from "react";
import ReservationCard from "./reservation-card";
import { useGetCurrentUserReservationsQuery } from "@/redux/features/reservation-slice";
import Loading from "../loading";
import ReservationEmpty from "./reservation-empty";

type Props = {};

export default function ReservationList({}: Props) {
  const { data, isLoading } = useGetCurrentUserReservationsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <ReservationEmpty />;
  }

  return (
    <div className="container pb-2 pt-6">
      <h1 className="mb-6 text-2xl font-bold">My reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
        {data.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
}
