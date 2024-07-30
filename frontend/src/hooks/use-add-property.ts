"use client";

import { PropertyFormType } from "@/modals/add-property-modal";
import { closeModal } from "@/redux/features/modal-slice";
import { useAddPropertyMutation } from "@/redux/features/property-slice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "./use-redux-store";
import { useUploadImage } from "./use-upload-image";
import { createImageUrl, generateUniqueKey } from "@/lib/utils";

export const useAddProperty = () => {
  const [addProperty] = useAddPropertyMutation();
  const dispatch = useAppDispatch();
  const { uploadImageHandler } = useUploadImage();
  const { user } = useAppSelector((state) => state.auth);

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
      })
      .catch(async (error) => {
        // TODO: This might be more specific in the future
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
      const uniqueKey = generateUniqueKey(image.name, user!.id);
      await uploadImageHandler(uniqueKey, image);
      const imageUrl = createImageUrl(uniqueKey);
      handleAddProperty(data, imageUrl);
    }
  };

  return {
    addProperty,
    handleAddProperty,
    onSubmit,
  };
};
