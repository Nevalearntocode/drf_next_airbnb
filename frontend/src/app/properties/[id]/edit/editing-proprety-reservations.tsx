"use client";

import { ShortenReservation } from "@/types/reservations";
import React from "react";

type Props = {
  reservations: ShortenReservation[];
};

export default function EditingPropertyReservations({ reservations }: Props) {
  console.log(reservations);
  return <div>EditingPropertyReservations</div>;
}
