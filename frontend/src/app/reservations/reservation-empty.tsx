"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function ReservationEmpty({}: Props) {
  const router = useRouter();
  return (
    <div className="mt-24 flex w-full flex-col items-center justify-center gap-8">
      <Image src={"/svgs/empty.svg"} alt="notfound" width={300} height={300} />
      <p className="text-center text-xl text-gray-500">
        <span className="text-3xl font-bold">
          You don't have any reservations
        </span>
      </p>
      <Button onClick={() => router.push("/")}>Return to homepage</Button>
    </div>
  );
}
