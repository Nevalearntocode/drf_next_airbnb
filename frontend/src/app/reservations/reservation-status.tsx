"use client";

import { Reservation } from "@/types/reservations";
import React from "react";

type Props = {
  status: Reservation["status"];
};

export default function ReservationStatus({ status }: Props) {
  if (status === "ended") {
    return <div className="h-2 w-2 rounded-full border bg-rose-500" />;
  }

  if (status === "ongoing") {
    return <div className="h-2 w-2 rounded-full border bg-green-500" />;
  }
  if (status === "reserved") {
    return <div className="h-2 w-2 rounded-full border bg-yellow-500" />;
  }

  return <></>;
}
