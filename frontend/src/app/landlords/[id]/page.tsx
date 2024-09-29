import React from "react";
import PropertyList from "@/app/_components/properties/property-list";
import LandlordProfile from "../landlord-profile";

type Props = {
  params: {
    id: string;
  };
};

const LandlordPage = ({ params }: Props) => {
  const landlordId = params.id;

  return (
    <div className="container grid grid-cols-1 gap-4 pt-12 md:grid-cols-4">
      <LandlordProfile id={landlordId} />

      <div className="col-span-3 pl-0 md:pl-6">
        <PropertyList route="landlord" />
      </div>
    </div>
  );
};

export default LandlordPage;
