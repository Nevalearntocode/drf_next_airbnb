"use client";

import React, { useEffect } from "react";
import Conversation from "./conversation";
import { useGetConversationsQuery } from "@/redux/features/chat-slice";
import ConversationDetail from "./conversation-detail";
import { useAppSelector } from "@/hooks/use-redux-store";
import { identifyUsers } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

type Props = {};

export default function ConversationList({}: Props) {
  const { data } = useGetConversationsQuery();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const hasConversations = data && data.length > 0;

  useEffect(() => {
    if (hasConversations && user) {
      router.push(`/conversations/?conversation=${data[0].id}`);
    }
  }, [hasConversations, user, data, router]);

  if (!hasConversations || !user)
    return (
      <div className="flex h-full w-full flex-col items-center gap-4 pt-44">
        <h1 className="text-2xl font-bold">No conversations found</h1>
        <Button>
          <Link href={"/"}>Go back to homepage</Link>
        </Button>
      </div>
    );

  const initialConversationId = data[0].id;

  return (
    <div className="flex h-full w-full gap-4 pt-2 md:pt-14">
      <div className="hidden flex-col gap-2 md:flex md:w-1/3 lg:w-1/4">
        {data.map((conversation) => {
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
      <Separator orientation="vertical" />
      {hasConversations && (
        <div className="relative h-full w-full">
          <ConversationDetail
            initialConversationId={initialConversationId}
            userId={user.id}
          />
        </div>
      )}
    </div>
  );
}
