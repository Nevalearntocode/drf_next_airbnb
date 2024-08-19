import { ConversationUser } from "./user";

type Conversation = {
  id: string;
  initiator: ConversationUser;
  receptitor: ConversationUser;
  created_at: Date;
  updated_at: Date;
};

type ConversationDetail = Conversation & {
  messages: Message[];
};

type Message = {
  id: string;
  sender: string;
  conversation: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export type { Conversation, ConversationDetail, Message };
