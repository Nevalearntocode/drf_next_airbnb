"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { identifyUsers } from "@/lib/utils";
import {
  useGetConversationDetailsQuery,
  useGetConversationMessageQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
} from "@/redux/features/chat-slice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import useWebSocket from "react-use-websocket";
import { useAppSelector } from "@/hooks/use-redux-store";
import MessageDisplay from "./message-display";
import { env } from "@/env";
import useScrollToBottom from "@/hooks/use-scroll-to-bottom";

type Props = {
  initialConversationId: string;
  userId: string;
};

const ConversationDetail = ({ initialConversationId, userId }: Props) => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string>("");
  const [messageId, setMessageId] = useState<string>("");
  const conversationId = searchParams.get("conversation");

  const messagesDiv = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetConversationDetailsQuery(
    conversationId ?? initialConversationId,
  );
  const { data: messages } = useGetConversationMessageQuery({
    conversation: conversationId ?? initialConversationId,
  });
  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();

  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>(
    messages?.results ?? [],
  );
  const scrollToBottom = useScrollToBottom();

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(
    `ws://${env.NEXT_PUBLIC_SOCKET}/ws/${conversationId ?? initialConversationId}/`,
    {
      share: false,
      shouldReconnect: () => true,
    },
  );

  useEffect(() => {
    if (messages) {
      setRealtimeMessages(messages.results);
    }
  }, [messages, conversationId, initialConversationId]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "content" in lastJsonMessage
    ) {
      const newMessage: Message = {
        id: "",
        sender: user?.id ?? "",
        deleted: false,
        content: lastJsonMessage.content as string,
        conversation: conversationId ?? initialConversationId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setRealtimeMessages((prevMessages) => {
        return [newMessage, ...prevMessages];
      });
    }

    scrollToBottom(messagesDiv);
  }, [lastJsonMessage, conversationId, initialConversationId]);

  if (!data) return null;

  const { receptitor, initiator } = data;
  const { otherUser } = identifyUsers(userId, initiator, receptitor);

  const onSubmit = () => {
    setLoading(true);
    sendMessage({
      content: message,
      receiver: otherUser.id,
    })
      .unwrap()
      .then(() => {
        sendJsonMessage({
          event: "chat_message",
          data: {
            content: message,
            conversation_id: conversationId ?? initialConversationId,
          },
        });
        setMessage("");
        scrollToBottom(messagesDiv);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to send message");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // add real-time here
  const onUpdate = () => {
    setLoading(true);
    updateMessage({
      id: messageId,
      content: message,
    })
      .unwrap()
      .then(() => {
        setIsEditing(false);
        setMessageId("");
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update message");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative h-[calc(100vh-180px)] w-full">
      <div
        className="flex max-h-[400px] flex-col space-y-4 overflow-auto"
        ref={messagesDiv}
      >
        {realtimeMessages
          .slice()
          .reverse()
          .map((message) => {
            const updated_at = new Date(message.updated_at);
            const created_at = new Date(message.created_at);
            const isEdited = updated_at.getTime() !== created_at.getTime();

            return (
              <MessageDisplay
                setIsEditing={setIsEditing}
                setMessageId={setMessageId}
                setMessage={setMessage}
                id={message.id}
                isDeleted={message.deleted}
                isEdited={isEdited}
                content={message.content}
                isOther={message.sender === otherUser.id}
                key={message.id}
              />
            );
          })}
      </div>
      <div className="absolute bottom-2 mt-4 w-full">
        {isEditing && (
          <div className="container">
            <p className="italic">Editing message...</p>
          </div>
        )}
        <div className="flex w-full space-x-4 rounded-xl px-6 py-2">
          <Input
            disabled={loading}
            type="text"
            placeholder="Type your message..."
            value={message}
            className="w-full rounded-xl bg-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={isEditing ? onUpdate : onSubmit}>send</Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
