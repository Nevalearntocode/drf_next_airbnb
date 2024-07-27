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
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { closeModal } from "@/redux/features/modal-slice";
import { Separator } from "@/components/ui/separator";
import { cn, createImageUrl, generateUniqueKey } from "@/lib/utils";
import StepCategory from "../components/form/step-category";
import StepDescription from "../components/form/step-description";
import StepLocation from "../components/form/step-location";
import StepDetail from "../components/form/step-detail";
import StepPrice from "../components/form/step-price";
import { DefaultPropertyValues, STEPS } from "@/constants";
import { useAddPropertyMutation } from "@/redux/features/property-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUploadImageMutation } from "@/redux/features/r2-slice";
import { createUploadUrlAction } from "@/app/action";

type Props = {};

const locationSchema = z.object({
  country: z.string(),
  country_code: z.string(),
});

export type LocationType = z.infer<typeof locationSchema>;

export const AddPropertyFormSchema = z.object({
  category: z.string().min(1, {
    message: "Please select a category where your property locates.",
  }),
  name: z.string().min(1, { message: "Give your property a catchy name." }),
  description: z
    .string()
    .min(1, { message: "Describe your listing in detail." }),
  image: z.union([z.instanceof(File), z.string()]).nullable(),
  guests: z.number().positive({ message: "Guest  must be a positive number." }),
  location: locationSchema,
  address: z.string().min(1, { message: "Enter your property address." }),
  bedrooms: z
    .number()
    .positive({ message: "Room  must be a positive number." }),
  bathrooms: z
    .number()
    .positive({ message: "Bathroom  must be a positive number." }),
  price: z
    .number()
    .positive({ message: "Enter a positive price for your listing." }),
});

export type PropertyFormType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyModal = (props: Props) => {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const router = useRouter();
  const isModalOpen = type === "add-property" && isOpen;
  const form = useForm<PropertyFormType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: DefaultPropertyValues,
  });
  const { control, setValue } = form;
  const isLoading = form.formState.isSubmitting;
  const hasErrors = Object.keys(form.formState.errors).length > 0;
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const [addProperty] = useAddPropertyMutation();
  const [uploadImage] = useUploadImageMutation();
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  const handleUploadImage = async (uniqueKey: string, image: File) => {
    const uploadUrl = await createUploadUrlAction(uniqueKey, image.type);
    uploadImage({ image: image, url: uploadUrl })
      .unwrap()
      .catch((error) => {
        console.log(error);
        toast.error("Failed to upload image");
      });
  };

  // delete the image from S3 bucket if there is an error in this function
  const handleAddProperty = (data: PropertyFormType, image: string) => {
    addProperty({
      ...data,
      country: data.location.country,
      country_code: data.location.country_code,
      image: image,
    })
      .unwrap()
      .then(async () => {
        toast.success("Property added successfully");
        dispatch(closeModal());
        setStep(STEPS.CATEGORY);
        form.reset();
        router.refresh();
      })
      .catch(async (error) => {
        console.log(error);
        toast.error("Failed to add property");
      });
  };

  const onSubmit = async (data: PropertyFormType) => {
    const image = data.image;
    if (!image) {
      toast.error("Please upload an image for your property");
      return;
    }
    if (typeof image === "string") {
      handleAddProperty(data, image);
    }
    if (typeof image == "object") {
      const uniqueKey = generateUniqueKey(image.name);
      await handleUploadImage(uniqueKey, image);
      const imageUrl = createImageUrl(uniqueKey);
      handleAddProperty(data, imageUrl);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Airbnb your home</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <DialogFooter className="mt-2">
              <div className="flex w-full items-center gap-4">
                <Button
                  variant={"outline"}
                  className="w-2/4"
                  onClick={(e) => {
                    e.preventDefault();
                    if (step === STEPS.CATEGORY) {
                      onClose();
                    } else {
                      onBack();
                    }
                  }}
                >
                  Back
                </Button>
                <Button
                  disabled={isLoading}
                  variant={"destructive"}
                  className={cn(
                    "ml-auto w-2/4",
                    step === STEPS.CATEGORY && "p-0",
                  )}
                  onClick={
                    step < STEPS.PRICE
                      ? (e) => {
                          e.preventDefault();
                          onNext();
                        }
                      : () => {}
                  }
                >
                  {step === STEPS.PRICE ? "Create" : "Next"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyModal;
