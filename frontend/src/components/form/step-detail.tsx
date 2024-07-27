"use client";

import React from "react";
import { FormField, FormItem } from "@/components/ui/form";
import FieldHeader from "./field-header";
import { AddPropertyControl, FieldState } from "@/types/form";
import Counter from "./counter";
import { Separator } from "@/components/ui/separator";

type Props = {
  control: AddPropertyControl;
  state?: FieldState;
};

export default function StepDetail({ control, state = "standard" }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      <FormField
        control={control}
        name="guests"
        render={({ field }) => (
          <FormItem className="">
            <div className="mb-4">
              {state === "modal" && (
                <FieldHeader
                  label="Share some basics about your place."
                  description="What amenities do you have?"
                />
              )}
            </div>
            <Counter
              onChange={field.onChange}
              title="Guests"
              subtitle="Let us know how many people you're planning for."
              value={field.value}
            />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={control}
        name="bedrooms"
        render={({ field }) => (
          <FormItem className="">
            <Counter
              onChange={field.onChange}
              title="Bedrooms"
              subtitle="How many bedrooms do you have?"
              value={field.value}
            />
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={control}
        name="bathrooms"
        render={({ field }) => (
          <FormItem className="">
            <Counter
              onChange={field.onChange}
              title="Bathrooms"
              subtitle="Choose the number of bathrooms for your place."
              value={field.value}
            />
          </FormItem>
        )}
      />
    </div>
  );
}
