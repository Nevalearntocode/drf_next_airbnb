"use client";

import React from "react";
import { PropertyReservationFormType } from "./property-reservation";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  control: Control<PropertyReservationFormType>;
  onHandleGuestsChange: (value: string) => void;
  guests: number;
};

export default function PropertyReservationNumberOfGuests({
  control,
  onHandleGuestsChange,
  guests,
}: Props) {
  return (
    <FormField
      control={control}
      name="guests"
      render={({ field }) => (
        <FormItem className="rounded-xl">
          <FormLabel>Guests</FormLabel>
          <Select onValueChange={onHandleGuestsChange} defaultValue={"Guests"}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Array.from({ length: guests }, (_, i) => i + 1).map((i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i} guests
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
