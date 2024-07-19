"use server";

import { deleteFile, getSignedUrlForFile } from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForFile(key, type);
}

export async function deleteImageAction(key: string) {
  return await deleteFile(key);
}
