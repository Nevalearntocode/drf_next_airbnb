"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCreateConversationMutation } from "@/redux/features/chat-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  className?: string
};

const ContactButton = ({ id, className }: Props) => {
  const [createConversation] = useCreateConversationMutation();
  const router = useRouter();

  const onClick = () => {
    createConversation({ receptitor: id })
      .unwrap()
      .then((res) => {
        router.push(`/conversations/?conversation=${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to create conversation");
      });
  };

  return (
    <Button className={cn("", className)} onClick={onClick}>
      Contact
    </Button>
  );
};

export default ContactButton;
