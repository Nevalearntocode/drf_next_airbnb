import { PaginatedResults } from "./general";
import { ConversationUser } from "./user";

type Conversation = {
  id: string;
  initiator: ConversationUser;
  receptitor: ConversationUser;
  created_at: string;
  updated_at: string;
  last: Pick<Message, "sender" | "content" | "created_at">;
};

type Message = {
  id: string;
  sender: string;
  conversation: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type Messages = PaginatedResults & {
  results: Message[];
};

export type { Conversation, Message, Messages };
