"use client";

import React from "react";
import ReservationStatus from "./reservation-status";
import { Reservation } from "@/types/reservations";

type Props = {
  property_name: string;
  check_in: string;
  check_out: string;
  status: Reservation["status"];
  nights: number;
  total: number;
};

export default function ReservationInfo({
  check_in,
  check_out,
  property_name,
  status,
  nights,
  total,
}: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex">
        <h2 className="mb-4 text-xl font-bold">{property_name}</h2>
      </div>
      <div className="relative flex h-full flex-col gap-4">
        <p className="flex items-center justify-between">
          <span className="font-semibold">Check in date: </span>
          {check_in}
        </p>
        <p className="flex items-center justify-between">
          <span className="font-semibold">Check out date: </span>
          {check_out}
        </p>
        <p className="flex items-center justify-between">
          <span className="font-semibold">Number of nights: </span> {nights}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Status: </span>
          <ReservationStatus status={status} />
        </div>
        <p className="flex w-full items-center justify-between">
          <span className="font-semibold">Total price: </span>${total}
        </p>
      </div>
    </div>
  );
}
