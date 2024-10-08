import PropertyList from "@/app/_components/properties/property-list";
import React from "react";

type Props = {};

const MyPropertiesPage = (props: Props) => {
  return (
    <main className="container">
      <div className="mt-8 flex h-full flex-col gap-8 sm:flex-row">
        <PropertyList route="favorite" />
      </div>
    </main>
  );
};

export default MyPropertiesPage;
