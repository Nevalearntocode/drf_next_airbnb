"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import FieldHeader from "./field-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddPropertyControl } from "@/types/form";

type Props = {
  control: AddPropertyControl;
  isLoading: boolean;
};

const DescriptionStep = ({ control, isLoading }: Props) => {
  return (
    <div className="mb-8 flex flex-col gap-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="">
            <div className="pb-4">
              <FieldHeader
                label="How would you describe your place?"
                description="Short and sweet work best."
              />
            </div>
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
            <FormControl>
              <Textarea
                placeholder="Description"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DescriptionStep;
