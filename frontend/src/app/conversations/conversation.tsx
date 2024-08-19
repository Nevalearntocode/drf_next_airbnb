"use client";

import { UserAvatar } from "@/components/user-avatar";
import { ConversationUser } from "@/types/user";
import React from "react";

type Props = {
  otherUser: ConversationUser;
  userId: string;
  conversationId: string;
};

const Conversation = ({ otherUser, userId, conversationId }: Props) => {
  const onClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("conversation", conversationId);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div
      className="cursor-pointer rounded-xl border border-gray-300 px-6 py-4 shadow-xl"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <UserAvatar
          currentUser={userId === otherUser.id}
          name={otherUser.name}
          image={otherUser.avatar ?? undefined}
        />
        <p className="text-md font-bold">{otherUser.name}</p>
      </div>
    </div>
  );
};

export default Conversation;
