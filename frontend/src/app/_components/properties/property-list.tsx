"use client";

import React from "react";
import PropertyCard from "./property-card";
import { useGetAllPropertiesQuery } from "@/redux/features/property-slice";
import { useSearchParams } from "next/navigation";

type Props = {};

const PropertyList = (props: Props) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || undefined;
  const name = searchParams.get("name") || undefined;
  const id = searchParams.get("id") || undefined;

  const { data } = useGetAllPropertiesQuery({ page, name, id });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data?.results.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
