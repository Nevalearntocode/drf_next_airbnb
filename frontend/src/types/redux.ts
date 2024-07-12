type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterArgs = {
  name: string;
  email: string;
  password: string;
  re_password: string;
};

type getPropertiesArgs = {
  page?: string;
  name?: string;
  id?: string;
};

export type { AuthState, LoginArgs, RegisterArgs, getPropertiesArgs }