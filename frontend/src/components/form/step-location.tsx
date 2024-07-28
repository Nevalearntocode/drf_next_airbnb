"use client";

import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import FieldHeader from "./field-header";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import ImageUpload from "./image-upload";
import {
  AddPropertyControl,
  AddPropertySetValue,
  FieldState,
} from "@/types/form";
import { Input } from "@/components/ui/input";
import { useCountries } from "@/hooks/use-countries";

type Props = {
  control: AddPropertyControl;
  setValue: AddPropertySetValue;
  state?: FieldState;
};

export default function StepLocation({
  control,
  setValue,
  state = "standard",
}: Props) {
  const onUploadImage = (image: File | string) => {
    setValue("image", image);
  };

  const { getAll } = useCountries();
  const countries = getAll();

  return (
    <div className="flex flex-col gap-y-4">
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            {state === "modal" && (
              <FieldHeader
                label="Where is your place located?"
                description="Help guests find you."
              />
            )}
            {state === "standard" && (
              <FormLabel className="font-semibold">Country</FormLabel>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {countries.find(
                      (country) => country.country === field.value.country,
                    )?.country || "Select country"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No countries found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          value={country.country}
                          key={country.country}
                          onSelect={() => {
                            setValue("location", {
                              country: country.country,
                              country_code: country.country_code,
                            });
                          }}
                          className="flex items-center justify-between"
                        >
                          <p className="text-sm">{country.country}</p>
                          <div className="flex items-center">
                            <p className="text-xs text-muted-foreground">
                              {country.country_code}
                            </p>
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                field.value.country === country.country
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem className="">
            {state === "standard" && (
              <FormLabel className="font-semibold">Address</FormLabel>
            )}
            <FormControl>
              <Input placeholder="Address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="image"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            {state === "modal" && (
              <FieldHeader
                label="Add a photo"
                description="Help guests visualize your place."
              />
            )}
            {state === "standard" && (
              <FormLabel className="font-semibold">Property image</FormLabel>
            )}
            <FormControl>
              <ImageUpload
                onChange={onUploadImage}
                value={field.value}
                onRemove={() => setValue("image", null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
