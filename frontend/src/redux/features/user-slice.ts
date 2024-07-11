import { apiSlice } from "../services/api-slice";

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

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
};

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (args: LoginArgs) => ({
        url: "/jwt/create/",
        method: "POST",
        body: args,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (args: RegisterArgs) => ({
        url: "/register",
        method: "POST",
        body: args,
      }),
    }),
    retrieveUser: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (args: {name: string, avatar: string | null}) => ({
        url: "/users/me",
        method: "PUT",
        body: args,
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRetrieveUserQuery,
} = userSlice;
