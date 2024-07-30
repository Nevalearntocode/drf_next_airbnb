"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { closeModal } from "@/redux/features/modal-slice";
import { Separator } from "@/components/ui/separator";
import { DefaultPropertyValues, STEPS } from "@/constants";
import {
  StepCategory,
  StepDescription,
  StepDetail,
  StepLocation,
  StepPrice,
} from "@/components/form";
import StepSetter from "@/components/form/step-setter";
import { useAddProperty } from "@/hooks/use-add-property";

type Props = {};

const locationSchema = z.object({
  country: z.string(),
  country_code: z.string(),
});

export type LocationType = z.infer<typeof locationSchema>;

export const AddPropertyFormSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.union([z.instanceof(File), z.string()]).nullable(),
  guests: z.number().positive(),
  location: locationSchema,
  address: z.string().min(1),
  bedrooms: z.number().positive(),
  bathrooms: z.number().positive(),
  price: z.number().positive(),
});

export type PropertyFormType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyModal = (props: Props) => {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const { onSubmit } = useAddProperty();
  const form = useForm<PropertyFormType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: DefaultPropertyValues,
  });
  const { control, setValue } = form;
  const isLoading = form.formState.isSubmitting;
  const isModalOpen = type === "add-property" && isOpen;
  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const onClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (data: PropertyFormType) => {
    onSubmit(data);
    onClose();
    form.reset();
    setStep(STEPS.CATEGORY);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Airbnb your home</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {step === STEPS.CATEGORY && (
              <StepCategory control={control} state={"modal"} />
            )}
            {step === STEPS.DESCRIPTION && (
              <StepDescription
                control={control}
                isLoading={isLoading}
                state={"modal"}
              />
            )}
            {step === STEPS.LOCATION && (
              <StepLocation
                control={control}
                setValue={setValue}
                state={"modal"}
              />
            )}
            {step === STEPS.DETAILS && (
              <StepDetail control={control} state={"modal"} />
            )}
            {step === STEPS.PRICE && (
              <StepPrice
                control={control}
                hasErrors={hasErrors}
                state={"modal"}
              />
            )}
            <DialogFooter className="mt-8">
              <StepSetter
                setStep={setStep}
                step={step}
                isLoading={isLoading}
                onClose={onClose}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyModal;
