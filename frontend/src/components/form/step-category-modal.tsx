"use client";

import React from "react";
import FieldHeader from "./field-header";
import { FormControl } from "../ui/form";
import { categories } from "@/constants";
import CategoryInput from "./category-input";
import { ControllerRenderProps } from "react-hook-form";
import { PropertyFormType } from "@/modals/add-property-modal";

type Props = {
  field: ControllerRenderProps<PropertyFormType, "category">;
};

export default function StepCategoryModal({ field }: Props) {
  return (
    <>
      <FieldHeader
        label="Which of these best describe your place?"
        description="Pick a category."
      />
      <FormControl>
        <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.label} className="col-span-1">
              <CategoryInput
                onClick={(formCategory) => {
                  field.onChange(formCategory.toLowerCase());
                }}
                selected={
                  field.value.toLowerCase() === category.label.toLowerCase()
                }
                categoryConstant={category}
              />
            </div>
          ))}
        </div>
      </FormControl>
    </>
  );
}
