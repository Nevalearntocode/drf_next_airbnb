"use client";

import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
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
import { useCountries } from "@/hooks/use-countries";
import { AddPropertyControl, AddPropertySetValue } from "@/types/form";
import { Input } from "@/components/ui/input";

type Props = {
  control: AddPropertyControl;
  setValue: AddPropertySetValue;
};

export default function LocationStep({ control, setValue }: Props) {
  const onUploadImage = (image: File) => {
    setValue("image", image);
  };

  const { getAll } = useCountries();
  const countries = getAll();

  return (
    <div className="mb-8">
      <div className="mb-8 flex flex-col gap-y-4">
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FieldHeader
                label="Where is your place located?"
                description="Help guests find you."
              />
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
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="image"
        render={({ field }) => (
          <FormItem className="">
            <div className="">
              <FieldHeader
                label="Add a photo"
                description="Help guests visualize your place."
              />
            </div>
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