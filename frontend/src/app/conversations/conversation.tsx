import React from "react";
import { UserAvatar } from "@/components/user-avatar";
import { Conversation as ConversationType } from "@/types/chat";
import { ConversationUser } from "@/types/user";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  otherUser: ConversationUser;
  userId: string;
  conversationId: string;
  last: ConversationType["last"];
};

const Conversation = ({ otherUser, userId, conversationId, last }: Props) => {
  const searchParams = useSearchParams();
  const currentConversationId = searchParams.get("conversation");
  const onClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("conversation", conversationId);
    window.history.replaceState({}, "", url.toString());
  };

  const sender = last && userId === last.sender ? "You" : otherUser.name;

  return (
    <div
      className={cn(
        "flex cursor-pointer gap-2 rounded-xl border border-gray-300 px-6 py-4 shadow-xl",
        currentConversationId === conversationId ? "bg-gray-200" : "",
      )}
      onClick={onClick}
    >
      <div className="flex h-full gap-2">
        <UserAvatar
          currentUser={userId === otherUser.id}
          name={otherUser.name}
          image={otherUser.avatar ?? undefined}
        />
      </div>
      <div className="flex max-w-[150px] flex-col">
        <p className="text-sm font-bold lg:text-lg">{otherUser.name}</p>
        {last ? (
          <>
            <p className="line-clamp-1 text-sm italic">
              <span className="font-semibold">{sender}: </span>
              {last.content}
            </p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNowStrict(parseISO(last.created_at), {
                addSuffix: true,
              })}
            </p>
          </>
        ) : (
          <p className="text-sm italic">Start a conversation</p>
        )}
      </div>
    </div>
  );
};

export default Conversation;
