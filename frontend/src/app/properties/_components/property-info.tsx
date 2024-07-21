import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import PropertyReservation from "./property-reservation";
import Link from "next/link";
import { PropertyWithLandlordAndReservation } from "@/types/property";

type Props = {
  property: PropertyWithLandlordAndReservation;
};

const PropertyInfo = ({ property }: Props) => {
  const {
    name,
    description,
    landlord,
    bathrooms,
    bedrooms,
    price,
    guests,
    id,
  } = property;

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
      <div className="col-span-3 py-6 pr-6">
        <h1 className="mb-4 text-4xl font-bold">{name}</h1>
        <span className="mb-6 block text-lg text-gray-600">
          {guests} guests · {bedrooms} bedroom · {bathrooms} bath
        </span>
        <Separator />
        <div className="flex items-center py-6">
          <Link href={"/landlord/1"} className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{landlord.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-lg font-bold">{landlord.name}</p>
          </Link>
        </div>
        <Separator />
        <p className="mt-6 text-lg">{description}</p>
      </div>
      <PropertyReservation
        guests={guests}
        price={price}
        reservations={property.reservations}
        fee_percentage={property.fee_percentage}
        id={id}
      />
    </div>
  );
};

export default PropertyInfo;
