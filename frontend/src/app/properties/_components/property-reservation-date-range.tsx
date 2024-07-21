"use client";

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { AddReservationControl } from "@/types/form";

type Props = {
  control: AddReservationControl;
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
          <FormLabel>Dates</FormLabel>
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
                        {format(field.value.from, "EE, dd MMM yyyy")} -{" "}
                        {format(field.value.to, "EE, dd MMM yyyy")}
                      </>
                    ) : (
                      format(field.value.from, "EE, dd MMM yyyy")
                    )
                  ) : (
                    <span>Select dates</span>
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
          <FormDescription>Select check in and check out dates</FormDescription>
        </FormItem>
      )}
    />
  );
}
