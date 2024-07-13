import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  guests: number;
  price: number;
};

const PropertyReservation = ({ guests, price }: Props) => {
  return (
    <aside className="col-span-2 mt-6 rounded-xl border-gray-300 p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-semibold">${price} per night</h2>

      <div className="mb-6 rounded-xl border border-gray-300 p-3">
        <label className="mb-2 block text-xs font-bold">Guests</label>
        <select className="-ml-1 w-full text-sm focus:outline-none">
          {Array.from({ length: guests }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <Button className="mb-6 w-full py-6" size={"lg"}>
        Book
      </Button>
      <div className="mb-4 flex items-center justify-between">
        <p>${price} * 2 nights</p>
        <p>${price * 2}</p>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <p>Fee</p>
        <p>$40</p>
      </div>
      <Separator />
      <div className="mt-4 flex items-center justify-between font-bold">
        <p>Total</p>
        <p>${price * 2 + 40}</p>
      </div>
    </aside>
  );
};

export default PropertyReservation;
