"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { identifyUsers } from "@/lib/utils";
import {
  useGetConversationDetailsQuery,
  useGetConversationMessageQuery,
} from "@/redux/features/chat-slice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useWebSocket from "react-use-websocket";
import { useRef } from "react";
import { Message } from "@/types/chat";
import { useAppSelector } from "@/hooks/use-redux-store";

type Props = {
  initialConversationId: string;
  userId: string;
};

const ConversationDetail = ({ initialConversationId, userId }: Props) => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string>("");
  const conversationId = searchParams.get("conversation");

  const messagesDiv = useRef<HTMLDivElement>(null);

  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetConversationDetailsQuery(
    conversationId ?? initialConversationId,
  );
  const { data: messages } = useGetConversationMessageQuery({
    conversation: conversationId ?? initialConversationId,
  });

  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>(
    messages?.results ?? [],
  );

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(
    `ws://localhost:8000/ws/${conversationId ?? initialConversationId}/?user=${user?.id}`,
    {
      share: false,
      shouldReconnect: () => true,
    },
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesDiv.current) {
        messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (messages) {
      setRealtimeMessages(messages.results.slice().reverse());
    }
  }, [messages]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "content" in lastJsonMessage
    ) {
      const newMessage: Message = {
        id: "",
        sender: user?.id as string,
        content: lastJsonMessage.content as string,
        created_at: new Date().toISOString(),
        conversation: conversationId ?? initialConversationId,
        updated_at: new Date().toISOString(),
      };
      setRealtimeMessages((prev) => [...prev, newMessage]);
    }

    scrollToBottom();
  }, [lastJsonMessage]);

  if (!data) return null;

  const { receptitor, initiator } = data;
  const { currentUser, otherUser } = identifyUsers(
    userId,
    initiator,
    receptitor,
  );

  const onSubmit = () => {
    sendJsonMessage({
      event: "chat_message",
      data: {
        content: message,
        conversation_id: conversationId ?? initialConversationId,
      },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <div className="relative h-[calc(100vh-180px)] w-full">
      <div
        className="flex max-h-[400px] flex-col space-y-4 overflow-auto"
        ref={messagesDiv}
      >
        {realtimeMessages.map((message) => {
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
