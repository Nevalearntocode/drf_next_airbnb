"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { identifyUsers } from "@/lib/utils";
import {
  useGetConversationDetailsQuery,
  useGetConversationMessageQuery,
  useSendMessageMutation,
} from "@/redux/features/chat-slice";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  initialConversationId: string;
  userId: string;
};

const ConversationDetail = ({ initialConversationId, userId }: Props) => {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation");
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState<string>("");
  const { data } = useGetConversationDetailsQuery(
    conversationId ?? initialConversationId,
  );
  const { data: messages } = useGetConversationMessageQuery({
    conversation: conversationId ?? initialConversationId,
  });
  let currentMessageBatch = messages?.results ?? [];

  if (!data) return null;

  const { receptitor, initiator } = data;
  const { currentUser, otherUser } = identifyUsers(
    userId,
    initiator,
    receptitor,
  );

  const onSubmit = () => {
    sendMessage({
      content: message,
      receiver: otherUser.id,
    })
      .unwrap()
      .catch((err) => {
        console.log(err), toast.error("Failed to send message");
      });
  };

  return (
    <div className="relative h-[calc(100vh-180px)] w-full">
      <div className="flex max-h-[400px] flex-col space-y-4 overflow-auto">
        {currentMessageBatch
          .slice()
          .reverse()
          .map((message) => {
            if (message.sender === otherUser.id) {
              return (
                <div
                  key={message.id}
                  className="mr-auto max-w-[80%] rounded-xl bg-gray-200 px-6 py-4"
                >
                  <p className="font-bold text-gray-500">{otherUser.name}</p>
                  <p className="">{message.content}</p>
                </div>
              );
            } else {
              return (
                <div
                  key={message.id}
                  className="ml-auto max-w-[80%] rounded-xl bg-blue-200 px-6 py-4"
                >
                  <p className="font-bold text-gray-500">{currentUser.name}</p>
                  <p className="">{message.content}</p>
                </div>
              );
            }
          })}
      </div>
      <div className="absolute bottom-2 mt-4 flex w-full space-x-4 rounded-xl px-6 py-2">
        <Input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-xl bg-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={onSubmit}>send</Button>
      </div>
    </div>
  );
};

export default ConversationDetail;
