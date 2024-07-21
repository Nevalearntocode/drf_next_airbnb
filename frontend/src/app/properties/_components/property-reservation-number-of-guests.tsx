"use client";

import React from "react";
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
import { AddReservationControl } from "@/types/form";

type Props = {
  control: AddReservationControl;
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
          <Select onValueChange={onHandleGuestsChange} defaultValue={`${field.value} guest`}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="1 guest" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Array.from({ length: guests }, (_, i) => i + 1).map((i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i} guest{i > 1 && "s"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
