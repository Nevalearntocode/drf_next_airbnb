import { env } from "@/env";
import { toast } from "sonner";

export const continueWithSocialAuth = async (
  provider: string,
  redirect: string,
) => {
  try {
    const url = `${env.NEXT_PUBLIC_HOST}/api/o/${provider}/?redirect_uri=${env.NEXT_PUBLIC_REDIRECT_URL}/auth/${redirect}`;

    const result = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await result.json();

    if (result.status === 200 && typeof window !== "undefined") {
      window.location.replace(data.authorization_url);
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  }
};

export const continueWithGoogleAuth = async () => {
  continueWithSocialAuth("google-oauth2", "google");
};
