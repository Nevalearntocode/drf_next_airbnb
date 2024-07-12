import { LoginArgs, RegisterArgs } from "@/types/redux";
import { apiSlice } from "../services/api-slice";
import { User } from "@/types/user";

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
