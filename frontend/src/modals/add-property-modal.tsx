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
import {
  Form,
  FormControl,
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
import CategoryInput from "@/modals/components/category-input";
import { cn } from "@/lib/utils";
import FieldHeader from "./components/field-header";
import { Textarea } from "@/components/ui/textarea";
import Counter from "./components/counter";
import { Check, ChevronsUpDown, DollarSign } from "lucide-react";
import CountrySelect from "./components/select-country";
import { useCountries } from "@/hooks/use-countries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import ImageUpload from "./components/image-upload";

type Props = {};

const locationSchema = z.object({
  name: z.string(),
  country_code: z.string(),
});

export type LocationType = z.infer<typeof locationSchema>;

const formSchema = z.object({
  category: z.string().min(1, {
    message: "Please select a category where your property locates.",
  }),
  name: z.string().min(1, { message: "Give your property a catchy name." }),
  description: z
    .string()
    .min(1, { message: "Describe your listing in detail." }),
  image: z.instanceof(File).nullable(),
  guests: z.number().positive({ message: "Guest  must be a positive number." }),
  location: locationSchema,
  bedrooms: z
    .number()
    .positive({ message: "Room  must be a positive number." }),
  bathrooms: z
    .number()
    .positive({ message: "Bathroom  must be a positive number." }),
  price: z
    .number()
    .positive({ message: "Enter a positive price for your listing." }),
  country_code: z.string(),
});

enum STEPS {
  CATEGORY = 0,
  DESCRIPTION = 1,
  DETAILS = 2,
  LOCATION = 3,
  PRICE = 4,
}

type FormType = z.infer<typeof formSchema>;

const AddPropertyModal = (props: Props) => {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const isModalOpen = type === "add-property" && isOpen;
  const dispatch = useAppDispatch();
  const { getAll } = useCountries();
  const countries = getAll();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      name: "",
      description: "",
      image: null,
      guests: 0,
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
      location: {
        name: "",
        country_code: "",
      },
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

  const onSetLocation = ({ name, country_code }: LocationType) => {
    form.setValue("location", { name, country_code });
  };

  const onUploadImage = (image: File) => {
    form.setValue("image", image);
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
                    <FieldHeader
                      label="Which of these best describe your place?"
                      description="Pick a category."
                    />
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
            {step === STEPS.DESCRIPTION && (
              <div className="mb-8 flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="pb-4">
                        <FieldHeader
                          label="How would you describe your place?"
                          description="Short and sweet work best."
                        />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === STEPS.LOCATION && (
              <div className="mb-8 flex flex-col gap-y-8">
                <FormField
                  control={form.control}
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
                                (country) => country.name === field.value.name,
                              )?.name || "Select country"}
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
                                    value={country.name}
                                    key={country.name}
                                    onSelect={() => {
                                      form.setValue("location", {
                                        name: country.name,
                                        country_code: country.country_code,
                                      });
                                    }}
                                    className="flex items-center justify-between"
                                  >
                                    <p className="text-sm">{country.name}</p>
                                    <div className="flex items-center">
                                      <p className="text-xs text-muted-foreground">
                                        {country.country_code}
                                      </p>
                                      <Check
                                        className={cn(
                                          "ml-2 h-4 w-4",
                                          field.value.name === country.name
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
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="">
                        <FieldHeader
                          label="Add some photos"
                          description="Help guests visualize your place."
                        />
                      </div>
                      <FormControl>
                        <ImageUpload
                          onChange={onUploadImage}
                          value={field.value}
                          onRemove={() => form.setValue("image", null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === STEPS.DETAILS && (
              <div className="mb-8 flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="mb-4">
                        <FieldHeader
                          label="Share some basics about your place."
                          description="What amenities do you have?"
                        />
                      </div>
                      <Counter
                        onChange={field.onChange}
                        title="Guests"
                        subtitle="Let us know how many people you're planning for."
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem className="">
                      <Counter
                        onChange={field.onChange}
                        title="Bedrooms"
                        subtitle="How many bedrooms do you have?"
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem className="">
                      <Counter
                        onChange={field.onChange}
                        title="Bathrooms"
                        subtitle="Choose the number of bathrooms for your place."
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === STEPS.PRICE && (
              <div className="mb-8">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <div>
                        <FieldHeader
                          label="Now, set your price."
                          description="How much do you charge per night?"
                        />
                      </div>
                      <FormControl>
                        <div className="relative flex w-auto items-center">
                          <Input
                            {...field}
                            className="p-6"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                          <DollarSign className="absolute left-1 h-4 w-4 opacity-75" />
                        </div>
                      </FormControl>
                      {hasErrors && (
                        <p className="text-rose-500 dark:text-rose-900">
                          Please fill all {field.value ? "previous " : "the "}
                          fields before submiting.
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
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
