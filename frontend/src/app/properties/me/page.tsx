import PropertyList from "@/app/_components/properties/property-list";
import React from "react";

type Props = {};

const MyPropertiesPage = (props: Props) => {
  return (
    <main>
      <h1 className="my-6 text-2xl font-bold">My properties</h1>
      <PropertyList />;
    </main>
  );
};

export default MyPropertiesPage;
