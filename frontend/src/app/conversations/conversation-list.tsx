"use client";

import React from "react";
import Conversation from "./conversation";
import { useGetConversationsQuery } from "@/redux/features/chat-slice";
import ConversationDetail from "./conversation-detail";
import { useAppSelector } from "@/hooks/use-redux-store";
import { identifyUsers } from "@/lib/utils";

type Props = {};

export default function ConversationList({}: Props) {
  const { data } = useGetConversationsQuery();
  const { user } = useAppSelector((state) => state.auth);

  const hasConversations = data && data.length > 0;

  if (!hasConversations || !user) return <div>No conversations</div>;

  const initialConversationId = data[0].id;

  return (
    <div className="flex gap-4 pt-12">
      <div className="flex w-auto max-w-[560px] flex-col gap-2">
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
      {hasConversations && (
        <div className="relative h-full w-full flex-1">
          <div className="fixed w-[76%] pr-20">
            <ConversationDetail
              initialConversationId={initialConversationId}
              userId={user.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
