"use server";

import { getSignedUrlForFile } from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForFile(key, type);
}
