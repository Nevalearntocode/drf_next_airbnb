"use client";

import React from "react";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import FieldHeader from "./field-header";
import { categories } from "@/constants";
import CategoryInput from "./category-input";
import { AddPropertyControl } from "@/types/form";

type Props = {
  control: AddPropertyControl;
};

function CategoryStep({ control }: Props) {
  return (
    <>
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem className="">
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
                        field.onChange(formCategory);
                      }}
                      selected={field.value === category.label}
                      categoryConstant={category}
                    />
                  </div>
                ))}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

export default CategoryStep;
