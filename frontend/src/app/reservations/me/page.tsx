import React from "react";
import ReservationCard from "../reservation-card";

type Props = {};

const MyReservation = (props: Props) => {
  return (
    <div className="pb-2 pt-6">
      <h1 className="mb-6 text-2xl">My reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
      </div>
    </div>
  );
};

export default MyReservation;
