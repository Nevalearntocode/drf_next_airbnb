"use client";

import React from "react";
import PropertyCard from "./property-card";
import { PropertyRoute } from "@/types/property";
import { usePropertyList } from "@/hooks/use-property-list";

type Props = {
  route: PropertyRoute;
};

const PropertyList = ({ route }: Props) => {
  const properties = usePropertyList(route);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {properties.data?.results.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
