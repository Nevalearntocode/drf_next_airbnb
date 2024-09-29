import Image from "next/image";
import React from "react";
import ContactButton from "../contact-button";
import PropertyList from "@/app/_components/properties/property-list";

type Props = {
  params: {
    id: string;
  };
};

const LandlordPage = ({ params }: Props) => {
  const landlordId = params.id;

  return (
    <div className="container grid grid-cols-1 gap-4 pt-12 md:grid-cols-4">
      <aside className="col-span-1 mb-4">
        <div className="flex flex-col items-center rounded-xl border border-gray-300 p-6 shadow-xl">
          <Image
            src={`/images/placeholder-dark.png`}
            width={200}
            height={200}
            alt={`avatar`}
            className="rounded-xl bg-muted"
          />
          <h1 className="my-6 text-2xl font-bold">Landlord's name</h1>
          <ContactButton id={landlordId} className="flex w-full" />
        </div>
      </aside>
      <div className="col-span-3 pl-0 md:pl-6">
        <PropertyList route="landlord" />
      </div>
    </div>
  );
};

export default LandlordPage;
