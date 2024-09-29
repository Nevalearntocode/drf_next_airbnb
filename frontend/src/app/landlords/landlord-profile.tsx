"use client";

import Image from "next/image";
import React from "react";
import ContactButton from "./contact-button";
import { useGetLandlordQuery } from "@/redux/features/user-slice";
import Loading from "../loading";

type Props = {
  id: string;
};

export default function LandlordProfile({ id }: Props) {
  const { data: landlord } = useGetLandlordQuery(id);
  return (
    <aside className="col-span-1 mb-4">
      <div className="flex flex-col items-center rounded-xl border border-gray-300 p-6 shadow-xl">
        <Image
          src={landlord?.avatar ?? `/images/placeholder-dark.png`}
          width={200}
          height={200}
          alt={`avatar`}
          className="rounded-xl bg-muted"
        />
        <h1 className="my-6 text-2xl font-bold">{landlord?.name}</h1>
        <ContactButton id={id} className="flex w-full" />
      </div>
    </aside>
  );
}
