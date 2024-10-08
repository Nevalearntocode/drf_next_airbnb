type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};

type ConversationUser = Omit<User, "email">;

type UserForm = {
  name: string;
  avatar: string | null;
  avatar_file: File | null;
};

export type { User, UserForm, ConversationUser };
