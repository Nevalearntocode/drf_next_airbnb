"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import FieldHeader from "./field-header";
import { Input } from "@/components/ui/input";
import { AddPropertyControl, FieldState } from "@/types/form";
import AutoResizeTextArea from "@/components/form/auto-resize-textarea";

type Props = {
  control: AddPropertyControl;
  isLoading: boolean;
  state?: FieldState;
};

const StepDescription = ({ control, isLoading, state = "standard" }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="">
            {state === "modal" && (
              <div className="">
                <FieldHeader
                  label="How would you describe your place?"
                  description="Short and sweet work best."
                />
              </div>
            )}
            {state === "standard" && (
              <FormLabel className="font-semibold">Name</FormLabel>
            )}
            <FormControl>
              <Input placeholder="Name" disabled={isLoading} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="">
            {state === "standard" && (
              <FormLabel className="font-semibold">Description</FormLabel>
            )}
            <FormControl>
              <AutoResizeTextArea field={field} isLoading={isLoading} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepDescription;
