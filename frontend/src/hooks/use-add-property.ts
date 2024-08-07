"use client";

import { PropertyFormType } from "@/modals/add-property-modal";
import { closeModal } from "@/redux/features/modal-slice";
import { useAddPropertyMutation } from "@/redux/features/property-slice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "./use-redux-store";

export const useAddProperty = () => {
  const [addProperty] = useAddPropertyMutation();
  const dispatch = useAppDispatch();

  const handleAddProperty = (
    data: PropertyFormType,
    image: string | null,
    image_file: File | null,
  ) => {
    addProperty({
      ...data,
      country: data.location.country,
      country_code: data.location.country_code,
      image,
      image_file,
    })
      .unwrap()
      .then(async () => {
        toast.success("Property added successfully");
        dispatch(closeModal());
      })
      .catch(async (error) => {
        // TODO: This might be more specific in the future
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
      handleAddProperty(data, image, null);
    }
    if (typeof image === "object") {
      handleAddProperty(data, null, image);
    }
  };

  return {
    addProperty,
    handleAddProperty,
    onSubmit,
  };
};
