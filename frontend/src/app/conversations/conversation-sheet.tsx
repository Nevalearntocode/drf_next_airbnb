"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetConversationsQuery } from "@/redux/features/chat-slice";
import Conversation from "./conversation";
import { identifyUsers } from "@/lib/utils";
import { useAppSelector } from "@/hooks/use-redux-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function ConversationSheet({ children }: Props) {
  const { data: conversations } = useGetConversationsQuery();
  const { user } = useAppSelector((state) => state.auth);
  const hasConversations = conversations && conversations.length > 0;

  if (!hasConversations || !user)
    return (
      <div className="flex h-full w-full flex-col items-center gap-4 pt-44">
        <h1 className="text-2xl font-bold">No conversations found</h1>
        <Button>
          <Link href={"/"}>Go back to homepage</Link>
        </Button>
      </div>
    );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"right"} aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Conversations</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-2">
          {conversations.map((conversation) => {
            const { initiator, receptitor, id } = conversation;
            const { currentUser, otherUser } = identifyUsers(
              user.id,
              initiator,
              receptitor,
            );

            return (
              <Conversation
                key={conversation.id}
                conversationId={id}
                otherUser={otherUser}
                userId={currentUser.id}
                last={conversation.last}
              />
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
