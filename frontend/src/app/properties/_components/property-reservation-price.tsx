import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  price: number;
  nights: number;
  fee: number;
  total: number;
};

const PropertyReservationPrice = ({ fee, price, nights, total }: Props) => {

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p>
          ${price} * {nights}
        </p>
        <p>${price * nights}</p>
      </div>
      <Separator />
      <div className="my-4 flex items-center justify-between">
        <p>Service fee</p>
        <p>${fee}</p>
      </div>
      <Separator />
      <div className="mt-4 flex items-center justify-between font-bold">
        <p>Total</p>
        <p>${total}</p>
      </div>
    </>
  );
};

export default PropertyReservationPrice;
