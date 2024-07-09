import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {};

const PropertyReservation = (props: Props) => {
  return (
    <aside className="col-span-2 mt-6 rounded-xl border-gray-300 p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-semibold">$1000 per night</h2>

      <div className="mb-6 rounded-xl border border-gray-300 p-3">
        <label className="mb-2 block text-xs font-bold">Guests</label>
        <select className="-ml-1 w-full text-sm focus:outline-none">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>
      </div>
      <Button className="mb-6 w-full py-6" size={"lg"}>
        Book
      </Button>
      <div className="mb-4 flex items-center justify-between">
        <p>$1000 * 2 nights</p>
        <p>$2000</p>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <p>Fee</p>
        <p>$40</p>
      </div>
      <Separator />
      <div className="mt-4 flex items-center justify-between font-bold">
        <p>Total</p>
        <p>$2040</p>
      </div>
    </aside>
  );
};

export default PropertyReservation;
