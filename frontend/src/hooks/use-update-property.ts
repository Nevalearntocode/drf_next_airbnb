"use client";

import { PropertyFormType } from "@/modals/add-property-modal";
import { useUpdatePropertyMutation } from "@/redux/features/property-slice";
import { PropertyWithLandlordAndReservation } from "@/types/property";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "./use-redux-store";
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
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleUpdateProperty = (
    data: PropertyFormType,
    image: string | null,
    image_file: File | null,
  ) => {
    updateProperty({
      id: property.id,
      data: {
        ...data,
        country: data.location.country,
        country_code: data.location.country_code,
        image,
        image_file,
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
      handleUpdateProperty(data, image, null);
    }
    if (typeof image === "object") {
      handleUpdateProperty(data, null, image);
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
