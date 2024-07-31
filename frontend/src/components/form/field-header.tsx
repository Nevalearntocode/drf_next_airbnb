import { FormDescription, FormLabel } from "@/components/ui/form";
import React from "react";

type Props = {
  label: string;
  description: string;
};

const FieldHeader = ({ label, description }: Props) => {
  return (
    <div className="mb-2">
      <FormLabel className="text-xl font-bold">{label}</FormLabel>
      <FormDescription className="text-sm italic">
        {description}
      </FormDescription>
    </div>
  );
};

export default FieldHeader;
