import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const AddPropertyButton = (props: Props) => {
  return (
    <div className="p-2 text-sm">
      <Button className="rounded-full">Airbnb your home</Button>
    </div>
  );
};

export default AddPropertyButton;
