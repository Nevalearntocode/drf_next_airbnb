"use client";

import React from "react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import FieldHeader from "./field-header";
import { AddPropertyControl } from "@/types/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

type Props = {
  control: AddPropertyControl;
  hasErrors: boolean;
};

export default function PriceStep({ control, hasErrors }: Props) {
  return (
    <div className="mb-8">
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-y-4">
            <div>
              <FieldHeader
                label="Now, set your price."
                description="How much do you charge per night?"
              />
            </div>
            <FormControl>
              <div className="relative flex w-auto items-center">
                <Input
                  {...field}
                  className="p-6"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                <DollarSign className="absolute left-1 h-4 w-4 opacity-75" />
              </div>
            </FormControl>
            {hasErrors && (
              <p className="text-rose-500 dark:text-rose-900">
                Please fill all {field.value ? "previous " : "the "}
                fields before submiting.
              </p>
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
