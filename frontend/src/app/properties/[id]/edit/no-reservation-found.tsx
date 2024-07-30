"use client";

import Image from "next/image";
import React from "react";

type Props = {};

export default function NoReservationFound({}: Props) {
  return (
    <div className="h-full w-full flex-1">
      <h1 className="text-2xl font-bold">Reservations</h1>
      <div className="relative hidden justify-center pt-8 sm:flex">
        <div className="fixed flex flex-col">
          <div className="relative aspect-square">
            <Image src={"/svgs/empty.svg"} alt="notfound" fill />
          </div>
          <p className="text-center text-xl text-gray-500">
            <span className="text-3xl font-bold">No reservations found</span>
          </p>
        </div>
      </div>
      <div className="block pt-4 sm:hidden">
        <div className="relative aspect-square">
          <Image src={"/svgs/empty.svg"} alt="notfound" fill />
        </div>
        <p className="text-center text-xl text-gray-500">
          <span className="text-3xl font-bold">No reservations found</span>
        </p>
      </div>
    </div>
  );
}
