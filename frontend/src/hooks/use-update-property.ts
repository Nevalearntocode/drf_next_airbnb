"use client";

import { createImageUrl, generateUniqueKey } from "@/lib/utils";
import { PropertyFormType } from "@/modals/add-property-modal";
import { useUpdatePropertyMutation } from "@/redux/features/property-slice";
import { PropertyWithLandlordAndReservation } from "@/types/property";
import { toast } from "sonner";
import { useUploadImage } from "./use-upload-image";
import { useAppDispatch, useAppSelector } from "./use-redux-store";
import { deleteImageAction } from "@/app/action";
import { openModal } from "@/redux/features/modal-slice";
import {
  setConfirmHeader,
  setDeletingPropertyInfo,
} from "@/redux/features/confirm-slice";

type Props = {
  property: PropertyWithLandlordAndReservation;
};

export const useUpdateProperty = ({ property }: Props) => {
  const [updateProperty] = useUpdatePropertyMutation();
  const { uploadImageHandler } = useUploadImage();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleUpdateProperty = (data: PropertyFormType, image: string) => {
    updateProperty({
      id: property.id,
      data: {
        ...data,
        country: data.location.country,
        country_code: data.location.country_code,
        image: image,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Property updated successfully");
      })
      .catch(async (error) => {
        console.log(error);
        toast.error("Failed to update property");
      });
  };

  const onSubmit = async (data: PropertyFormType) => {
    const image = data.image ?? property.image;
    if (!user) {
      toast.error("Please login to update your property");
      return;
    }
    if (typeof image === "string") {
      handleUpdateProperty(data, image);
    }
    if (typeof image == "object") {
      const uniqueKey = generateUniqueKey(image.name, user.id);
      await uploadImageHandler(uniqueKey, image);
      const imageUrl = createImageUrl(uniqueKey);
      handleUpdateProperty(data, imageUrl);
    }
    // TODO: I will need a flag later on in the model to decide if current image is URL or file
    // If the image is not uploaded from the local machine, we don't need to send delete request to r2
    const currentImageKey = property.image.split("/").pop();
    const userIdInKey = currentImageKey?.includes(user.id ?? "");
    const imageChanged = currentImageKey && property.image !== image;

    if (userIdInKey && imageChanged) {
      await deleteImageAction(currentImageKey);
    }
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const { reservations } = property;

    if (reservations.length > 0) {
      toast.error("Cannot delete property with active reservations");
      return;
    }

    dispatch(openModal("confirm"));
    dispatch(
      setConfirmHeader({
        title: "Delete property",
        confirmType: "delete-property",
        message: "Are you sure you want to delete this property?",
      }),
    );
    dispatch(setDeletingPropertyInfo({ id: property.id, name: property.name }));
  };

  return {
    onSubmit,
    onDelete,
  };
};
