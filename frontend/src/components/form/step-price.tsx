"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FieldHeader from "./field-header";
import { AddPropertyControl, FieldState } from "@/types/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  control: AddPropertyControl;
  hasErrors: boolean;
  state?: FieldState;
};

export default function StepPrice({
  control,
  hasErrors,
  state = "standard",
}: Props) {
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col", state === "standard" && "mt-4")}
        >
          {state === "modal" && (
            <FieldHeader
              label="Now, set your price."
              description="How much do you charge per night?"
            />
          )}
          {state === "standard" && (
            <FormLabel className="font-semibold">Price</FormLabel>
          )}
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
  );
}
