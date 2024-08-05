"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { PropertyWithLandlordAndReservation } from "@/types/property";
import {
  AddPropertyFormSchema,
  PropertyFormType,
} from "@/modals/add-property-modal";
import {
  StepCategory,
  StepDescription,
  StepDetail,
  StepLocation,
  StepPrice,
} from "@/components/form";
import { useRouter } from "next/navigation";
import { DefaultPropertyValues } from "@/constants";
import { useUpdateProperty } from "@/hooks/use-update-property";

type Props = {
  property: PropertyWithLandlordAndReservation;
};

const EditingPropertyInfo = ({ property }: Props) => {
  const router = useRouter();
  const form = useForm<PropertyFormType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: DefaultPropertyValues,
  });

  useEffect(() => {
    form.setValue("image", property.image);
    form.setValue("category", property.category);
    form.setValue("price", property.price);
    form.setValue("address", property.address);
    form.setValue("guests", property.guests);
    form.setValue("bathrooms", property.bathrooms);
    form.setValue("bedrooms", property.bedrooms);
    form.setValue("description", property.description);
    form.setValue("name", property.name);
    form.setValue("location", {
      country: property.country,
      country_code: property.country_code,
    });
  }, [property, form]);

  const isLoading = form.formState.isSubmitting;

  const { onSubmit, onDelete } = useUpdateProperty({ property });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-2xl font-bold">{property.name}</h2>
        <StepDescription control={form.control} isLoading={isLoading} />
        <StepCategory control={form.control} state="standard" />
        <StepLocation control={form.control} setValue={form.setValue} />
        <StepDetail control={form.control} />
        <StepPrice control={form.control} hasErrors={false} />
        <div className="mt-2 flex items-center gap-4">
          <Button
            className="w-full"
            disabled={isLoading}
            variant="secondary"
            onClick={onDelete}
          >
            Delete property
          </Button>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditingPropertyInfo;
