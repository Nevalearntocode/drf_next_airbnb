"use client";

import React from "react";
import { FormControl, FormLabel } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ControllerRenderProps } from "react-hook-form";
import { PropertyFormType } from "@/modals/add-property-modal";
import { categories } from "@/constants";

type Props = {
    field: ControllerRenderProps<PropertyFormType, "category">
};

export default function StepCategoryStandard({
    field
}: Props) {
  return (
    <>
      <FormLabel className="font-semibold">Category</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <p className="text-sm capitalize">{field.value}</p>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.label}
              value={category.label.toLowerCase()}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
