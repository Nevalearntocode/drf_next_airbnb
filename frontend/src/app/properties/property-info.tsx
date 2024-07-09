import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import PropertyReservation from "./property-reservation";
import Link from "next/link";

type Props = {};

const PropertyInfo = (props: Props) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
      <div className="col-span-3 py-6 pr-6">
        <h1 className="mb-4 text-4xl font-bold">Modern House</h1>
        <span className="mb-6 block text-lg text-gray-600">
          2 guests · 1 bedroom · 1 bed · 1 bath
        </span>
        <Separator />
        <div className="flex items-center py-6">
          <Link href={"/landlord/1"} className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>LL</AvatarFallback>
            </Avatar>
            <p className="text-lg font-bold">Landlord's name</p>
          </Link>
        </div>
        <Separator />
        <p className="mt-6 text-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, facere
          doloremque praesentium blanditiis consequuntur error rem quia velit
          doloribus inventore expedita nulla tempora, quibusdam accusamus neque
          nesciunt laborum vero voluptas?
        </p>
      </div>
      <PropertyReservation />
    </div>
  );
};

export default PropertyInfo;
