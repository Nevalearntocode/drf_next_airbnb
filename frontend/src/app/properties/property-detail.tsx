"use client";

import React from "react";
import PropertyImage from "./property-image";
import PropertyInfo from "./property-info";
import { useGetPropertyDetailsQuery } from "@/redux/features/property-slice";

type Props = {
  id: string;
};

const PropertyDetail = ({ id }: Props) => {
  const { data } = useGetPropertyDetailsQuery({ id });

  console.log(data);

  if (!data) return null;

  return (
    <>
      <PropertyImage image={data.image} alt={data.name} />
      <PropertyInfo property={data} />
    </>
  );
};

export default PropertyDetail;
