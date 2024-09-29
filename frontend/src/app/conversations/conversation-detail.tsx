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
import { useRef } from "react";
import { Message } from "@/types/chat";
import useWebSocket from "react-use-websocket";
import MessageDisplay from "./message-display";
import { env } from "@/env";
import useScrollToBottom from "@/hooks/use-scroll-to-bottom";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useAppDispatch } from "@/hooks/use-redux-store";
import { apiSlice } from "@/redux/services/api-slice";

type Props = {
  initialConversationId: string;
  userId: string;
};

const ConversationDetail = ({ initialConversationId, userId }: Props) => {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation");
  const messagesDiv = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<string>("");
  const [messageId, setMessageId] = useState<string>("");

  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [type, setType] = useState<"edit" | "send">("send");

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`;
    }
  };

  const { data: conversation } = useGetConversationDetailsQuery(
    conversationId ?? initialConversationId,
  );

  const { data: messages } = useGetConversationMessageQuery({
    conversation: conversationId ?? initialConversationId,
  });

  const scrollToBottom = useScrollToBottom();

  useEffect(() => {
    if (messages) {
      setNewMessages(messages.results ?? []);
    }
  }, [messages, conversationId, initialConversationId]);

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const { sendJsonMessage } = useWebSocket(
    `ws://${env.NEXT_PUBLIC_SOCKET}/ws/conversations/${conversationId ?? initialConversationId}/`,
    {
      share: false,
      shouldReconnect: () => true,
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "send") {
          setNewMessages([...newMessages, data.new_message]);
        }
        if (data.type !== "send") {
          setNewMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === data.new_message.id ? data.new_message : msg,
            ),
          );
        }
        dispatch(
          apiSlice.util.invalidateTags([
            { type: "Conversations", id: conversationId ?? "LIST" },
          ]),
        );
      },
      onOpen: () => {
        console.log("WebSocket connection opened");
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  useEffect(() => {
    if (messagesDiv.current) {
      scrollToBottom(messagesDiv);
    }
  }, [newMessages, scrollToBottom]);

  if (!conversation) return null;

  const { receptitor, initiator } = conversation;

  const { otherUser } = identifyUsers(userId, initiator, receptitor);

  const sendMessage = () => {
    if (type === "edit") {
      sendJsonMessage({
        type,
        message: {
          id: messageId,
          content: message,
        },
      });
    }
    if (type === "send") {
      sendJsonMessage({ type, message });
    }
    setType("send");
    setMessage("");
  };
  const handleEdit = (messageId: string) => {
    setType("edit");
    const messageToEdit = newMessages.find(
      (message) => message.id === messageId,
    );
    setMessageId(messageId);
    setMessage(messageToEdit?.content ?? "");
  };

  const onUpdate = (messageId: string) => {
    setType("edit");
    const messageToEdit = newMessages.find(
      (message) => message.id === messageId,
    );
    setMessageId(messageId);
    setMessage(messageToEdit?.content ?? "");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (message.trim() === "") {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative h-[calc(100vh-180px)] w-full">
      <div
        className="flex max-h-[400px] flex-col space-y-4 overflow-auto"
        ref={messagesDiv}
      >
        {newMessages.map((message) => {
          const updated_at = new Date(message.updated_at);
          const created_at = new Date(message.created_at);
          const isEdited = updated_at.getTime() !== created_at.getTime();

          return (
            <MessageDisplay
              handleEdit={handleEdit}
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
        {type === "edit" && (
          <div className="container flex items-center">
            <p className="italic">Editing...</p>
            <Button
              variant="ghost"
              size={`icon`}
              className="rounded-full"
              onClick={() => {
                setType("send");
                setMessage("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="relative flex w-full space-x-4 rounded-xl px-6 py-2 pr-[72px]">
          <Textarea
            disabled={loading}
            placeholder="Type your message..."
            ref={textareaRef}
            value={message}
            className="max-h-24 min-h-[40px] resize-none overflow-y-auto"
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={isEditing ? () => onUpdate(messageId) : sendMessage}
            className="absolute right-0"
          >
            send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
