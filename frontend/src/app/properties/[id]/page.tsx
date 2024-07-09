import React from "react";
import PropertyImage from "../property-image";
import PropertyInfo from "../property-info";

type Props = {};

const PropertyDetail = (props: Props) => {
  return (
    <main className="container pb-6">
      <PropertyImage />
      <PropertyInfo />
    </main>
  );
};

export default PropertyDetail;
