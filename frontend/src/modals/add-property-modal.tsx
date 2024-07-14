"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { closeModal } from "@/redux/features/modal-slice";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/constants";
import CategoryInput from "@/components/category-input";
import { cn } from "@/lib/utils";

type Props = {};

const formSchema = z.object({
  category: z.string().min(1, {
    message: "Please select a category where your property locates.",
  }),
  name: z.string().min(1, { message: "Give your property a catchy name." }),
  description: z
    .string()
    .min(1, { message: "Describe your listing in detail." }),
  image: z.string().min(1, { message: "Upload an image of your property." }),
  guests: z.number().positive({ message: "Guest  must be a positive number." }),
  bedrooms: z
    .number()
    .positive({ message: "Room  must be a positive number." }),
  baths: z
    .number()
    .positive({ message: "Bathroom  must be a positive number." }),
  price: z
    .number()
    .positive({ message: "Enter a positive price for your listing." }),
  country_code: z.string(),
});

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type FormType = z.infer<typeof formSchema>;

const AddPropertyModal = (props: Props) => {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const isModalOpen = type === "add-property" && isOpen;
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      name: "",
      description: "",
      image: "",
      guests: 0,
      bedrooms: 0,
      baths: 0,
      price: 0,
    },
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const isLoading = form.formState.isSubmitting;
  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = async (data: FormType) => {
    console.log(data);
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-xl font-bold">
                      Which of these best describe your place?
                    </FormLabel>
                    <FormDescription className="text-sm italic">
                      Pick a category.
                    </FormDescription>
                    <FormControl>
                      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
                        {categories.map((category) => (
                          <div key={category.label} className="col-span-1">
                            <CategoryInput
                              onClick={(formCategory) => {
                                field.onChange(formCategory);
                              }}
                              selected={field.value === category.label}
                              categoryConstant={category}
                            />
                          </div>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
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
                  disabled={(hasErrors && step === STEPS.PRICE) || isLoading}
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
