"use client";

import Logo from "@/app/_components/navbar/logo";
import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SOCIALPROVIDERS } from "@/constants";
import { useLoginWithSocialMutation } from "@/redux/features/user-slice";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  provider: string;
};

export default function SocialAuthConfirm({ provider }: Props) {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const router = useRouter();
  const [loginWithSocial] = useLoginWithSocialMutation();
  if (!state || !code) return <NotFound />;

  const onSubmit = async () => {
    const socialProvider =
      SOCIALPROVIDERS[provider as keyof typeof SOCIALPROVIDERS];

    loginWithSocial({ provider: socialProvider, state, code })
      .unwrap()
      .then(() => {
        toast.success("Login successfully");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to login");
      });
  };

  return (
    <Card className="w-1/3">
      <CardHeader className="py-0">
        <CardTitle className="">
          <Logo />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-primary">
          You are now loggiing in with your {provider} account.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSubmit}>Confirm</Button>
      </CardFooter>
    </Card>
  );
}
