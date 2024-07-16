import { FormDescription, FormLabel } from "@/components/ui/form";
import React from "react";

type Props = {
  label: string;
  description: string;
};

const FieldHeader = ({ label, description }: Props) => {
  return (
    <>
      <FormLabel className="text-xl font-bold">{label}</FormLabel>
      <FormDescription className="text-sm italic">
        {description}
      </FormDescription>
    </>
  );
};

export default FieldHeader;
