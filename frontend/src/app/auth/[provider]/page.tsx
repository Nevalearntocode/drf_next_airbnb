import React from "react";
import SocialAuthConfirm from "./social-auth-confirm";

type Props = {
  params: {
    provider: string;
  };
};

export default function SocialAuth({ params }: Props) {
  return (
    <div className="container mt-28">
      <div className="flex w-full flex-col items-center pb-6 pt-3">
        <SocialAuthConfirm provider={params.provider} />
      </div>
    </div>
  );
}
