"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
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
import { toast } from "sonner";

const FormSchema = z.object({
  dateRange: z.object({
    from: z
      .date({
        required_error: "Start date is required.",
      })
      .nullable(),
    to: z
      .date({
        required_error: "End date is required.",
      })
      .nullable(),
  }),
});

export function DateRangePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateRange: {
        from: null,
        to: null,
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.dateRange.from) {
      toast.error("When do you want to check in?");
      return;
    }
    if (!data.dateRange.to) {
      toast.error("When do you want to check out?");
      return;
    }
    const check_in = format(data.dateRange.from, "yyyy-MM-dd");
    const check_out = format(data.dateRange.to, "yyyy-MM-dd");
    console.log({ check_in, check_out });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Range</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
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
                    disabled={{ from: new Date(), to: addDays(new Date(), 7) }}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
