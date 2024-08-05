"use client";

import { cn } from "@/lib/utils";
import { Reservation } from "@/types/reservations";
import React from "react";

type Props = {
  status: Reservation["status"];
};

export default function ReservationStatus({ status }: Props) {
  const color = {
    reserved: "bg-yellow-500",
    ongoing: "bg-green-500",
    ended: "bg-rose-500",
  };

  return (
    <div className="flex items-center gap-4">
      <p className="italic">{status}</p>
      <div className={cn("h-2 w-2 rounded-full border", color[status])} />
    </div>
  );
}
