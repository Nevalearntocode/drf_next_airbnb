import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    R2_ACCESS_KEY_ID: z.string().min(1),
    R2_SECRET_KEY_ID: z.string().min(1),
    R2_BUCKET_NAME: z.string().min(1),
    R2_ACCOUNT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_HOST: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_KEY_ID: process.env.R2_SECRET_KEY_ID,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  },
});
