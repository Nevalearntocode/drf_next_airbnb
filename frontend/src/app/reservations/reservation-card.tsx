import React from "react";
import Image from "next/image";
import { SquareArrowOutUpRight, SquareArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const ReservationCard = (props: Props) => {
  return (
    <div className="relative mt-4 grid grid-cols-1 gap-4 rounded-xl border border-gray-300 p-5 shadow-md lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={`/examples/modern.jpg`}
          alt={"modern"}
          fill
          className="object-cover transition duration-1000 hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-between space-y-2">
        <h2 className="mb-4 text-xl">Property name</h2>
        <p className="flex items-center justify-between">
          <span className="font-bold">Check in date: </span>
          9/7/2024
        </p>
        <p className="flex items-center justify-between">
          <span className="font-bold">Check out date: </span>
          11/7/2024
        </p>
        <p className="flex items-center justify-between">
          <span className="font-bold">Number of nights: </span>2
        </p>
        <p className="flex items-center justify-between">
          <span className="font-bold">Total price: </span>
          $2040
        </p>
        <Button>Go to property</Button>
      </div>
      <Button
        variant={`ghost`}
        className="absolute right-0 top-0 hidden items-center justify-center rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 lg:flex"
        size={"icon"}
      >
        <SquareArrowOutUpRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ReservationCard;
