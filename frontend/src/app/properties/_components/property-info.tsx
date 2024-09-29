import { Separator } from "@/components/ui/separator";
import React from "react";
import PropertyReservation from "./property-reservation";
import Link from "next/link";
import { PropertyWithLandlordAndReservation } from "@/types/property";
import { UserAvatar } from "@/components/user-avatar";
import ContactButton from "@/app/landlords/contact-button";
import { useAppSelector } from "@/hooks/use-redux-store";

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

  const { user } = useAppSelector((state) => state.auth);

  const isOwner = user?.id === landlord.id;

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
      <div className="col-span-3 py-6 pr-6">
        <h1 className="mb-4 text-4xl font-bold">{name}</h1>
        <span className="mb-6 block text-lg text-gray-600">
          {guests} guests · {bedrooms} bedroom · {bathrooms} bath
        </span>
        <Separator />
        <div className="flex items-center justify-between py-6">
          <Link
            href={`/landlords/${landlord.id}`}
            className="flex items-center space-x-4"
          >
            <UserAvatar
              name={landlord.name}
              image={landlord.avatar ?? undefined}
            />
            <p className="text-xl font-semibold underline decoration-1 underline-offset-2">
              {landlord.name}
            </p>
          </Link>
          {!isOwner && <ContactButton id={landlord.id} />}
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
