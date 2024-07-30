"use client";

import { createUploadUrlAction } from "@/app/action";
import { useUploadImageMutation } from "@/redux/features/r2-slice";
import { toast } from "sonner";

export const useUploadImage = () => {
  const [uploadImage] = useUploadImageMutation();

  const uploadImageHandler = async (uniqueKey: string, image: File) => {
    try {
      const uploadUrl = await createUploadUrlAction(uniqueKey, image.type);
      await uploadImage({ image: image, url: uploadUrl }).unwrap();
      return uploadUrl;
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  return { uploadImageHandler };
};
