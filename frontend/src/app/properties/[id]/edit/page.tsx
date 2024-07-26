import React from "react";
import EditingProperty from "./editting-property";

type Props = {
  params: {
    id: string;
  };
};

export default function EditProperty({ params }: Props) {
  return (
    <main className="container mb-8">
      <EditingProperty propertyId={params.id} />
    </main>
  );
}
