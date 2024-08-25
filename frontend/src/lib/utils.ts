import { getPropertiesArgs } from "@/types/redux";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ConversationUser } from "@/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function paramsAppender(args: getPropertiesArgs) {
  const params = new URLSearchParams();
  if (args.page) {
    params.append("page", args.page.toString());
  }
  if (args.name) {
    params.append("name", args.name);
  }
  if (args.id) {
    params.append("id", args.id);
  }

  return params;
}

export const identifyUsers = (
  userId: string,
  initiator: ConversationUser,
  receptitor: ConversationUser,
) => {
  const currentUser = userId === initiator.id ? initiator : receptitor;
  const otherUser = userId === initiator.id ? receptitor : initiator;

  return {
    currentUser,
    otherUser,
  };
};
