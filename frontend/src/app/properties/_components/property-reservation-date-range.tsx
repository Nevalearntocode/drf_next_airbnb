"use client";

import React from "react";
import { Control } from "react-hook-form";
import { PropertyReservationFormType } from "./property-reservation";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

type Props = {
  control: Control<PropertyReservationFormType>;
  isDisabled: (date: Date) => boolean;
};

export default function PropertyReservationDateRange({
  control,
  isDisabled,
}: Props) {
  return (
    <FormField
      control={control}
      name="dateRange"
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel>Date Range</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "yyyy-MM-dd")} -{" "}
                        {format(field.value.to, "yyyy-MM-dd")}
                      </>
                    ) : (
                      format(field.value.from, "yyyy-MM-dd")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value.from ?? undefined}
                disabled={isDisabled}
                selected={field.value as DateRange}
                onSelect={field.onChange}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Select a start and end date for the range.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
