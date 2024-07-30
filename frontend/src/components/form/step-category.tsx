"use client";

import React from "react";
import { FormField, FormItem } from "@/components/ui/form";
import { AddPropertyControl, FieldState } from "@/types/form";
import StepCategoryModal from "./step-category-modal";
import StepCategoryStandard from "./step-category-standard";

type Props = {
  control: AddPropertyControl;
  state?: FieldState;
};

function StepCategory({ control, state = "standard" }: Props) {
  return (
    <>
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem className="">
            {state === "modal" && <StepCategoryModal field={field} />}
            {state === "standard" && <StepCategoryStandard field={field} />}
          </FormItem>
        )}
      />
    </>
  );
}

export default StepCategory;
