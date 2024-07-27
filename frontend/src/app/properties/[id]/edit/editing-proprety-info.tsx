"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { PropertyWithLandlordAndReservation } from "@/types/property";
import {
  AddPropertyFormSchema,
  PropertyFormType,
} from "@/modals/add-property-modal";
import StepDescription from "@/components/form/step-description";
import StepDetail from "@/components/form/step-detail";
import StepLocation from "@/components/form/step-location";
import StepPrice from "@/components/form/step-price";

type Props = {
  property: PropertyWithLandlordAndReservation;
};

const EditingPropertyInfo = ({ property }: Props) => {
  const form = useForm<PropertyFormType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: {
      name: property.name,
      description: property.description,
      guests: property.guests,
      price: property.price,
      address: property.address,
      bathrooms: property.bathrooms,
      bedrooms: property.bedrooms,
      category: property.category,
      image: property.image,
      location: {
        country: property.country,
        country_code: property.country_code,
      },
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: PropertyFormType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-1/3 flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">{property.name}</h1>
        <StepDescription control={form.control} isLoading={isLoading} />
        <StepLocation control={form.control} setValue={form.setValue} />
        <StepDetail control={form.control} />
        <StepPrice control={form.control} hasErrors={false} />
        <Button className="flex self-end" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditingPropertyInfo;
