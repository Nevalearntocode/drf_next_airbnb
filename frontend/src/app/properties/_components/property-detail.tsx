"use client";

import React from "react";
import { useGetPropertyDetailsQuery } from "@/redux/features/property-slice";
import PropertyImage from "./property-image";
import PropertyInfo from "./property-info";

type Props = {
  id: string;
};

const PropertyDetail = ({ id }: Props) => {
  const { data } = useGetPropertyDetailsQuery({ id });

  if (!data) return null;

  return (
    <>
      <PropertyImage image={data.image} alt={data.name} />
      <PropertyInfo property={data} />
    </>
  );
};

export default PropertyDetail;
