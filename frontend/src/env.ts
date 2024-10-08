import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_HOST: z.string().min(1),
    NEXT_PUBLIC_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_SOCKET: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_REDIRECT_URL: process.env.NEXT_PUBLIC_REDIRECT_URL,
    NEXT_PUBLIC_SOCKET: process.env.NEXT_PUBLIC_SOCKET,
  },
});
