import React from "react";
import PropertyDetail from "../_components/property-detail";

type Props = {
  params: {
    id: string;
  };
};

const PropertyDetailPage = ({ params }: Props) => {
  return (
    <main className="container pb-6">
      <PropertyDetail id={params.id} />
    </main>
  );
};

export default PropertyDetailPage;
