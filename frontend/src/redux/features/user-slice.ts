import { LoginArgs, RegisterArgs } from "@/types/redux";
import { apiSlice } from "../services/api-slice";
import { User, UserForm } from "@/types/user";

type SocialArgs = {
  provider: string;
  state: string;
  code: string;
};

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginWithSocial: builder.mutation({
      query: ({ provider, state, code }: SocialArgs) => ({
        url: `/o/${provider}/?state=${encodeURIComponent(
          state,
        )}&code=${encodeURIComponent(code)}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
      invalidatesTags: [
        "User",
        { type: "Properties", id: "LIST" },
        { type: "MyProperties", id: "LIST" },
        { type: "Conversations", id: "LIST" },
      ],
    }),
    login: builder.mutation({
      query: (args: LoginArgs) => ({
        url: "/jwt/create/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: [
        "User",
        { type: "Properties", id: "LIST" },
        { type: "MyProperties", id: "LIST" },
        { type: "Conversations", id: "LIST" },
      ],
    }),
    logout: builder.mutation<undefined, void>({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (args: RegisterArgs) => ({
        url: "/users/",
        method: "POST",
        body: args,
      }),
    }),
    retrieveUser: builder.query<User, void>({
      query: () => ({
        url: "/users/me/",
        method: "GET",
      }),
      providesTags: (result) => (result ? [{ type: "User" }] : []),
    }),
    updateUser: builder.mutation({
      query: (args: UserForm) => {
        const form = new FormData();

        for (const [key, value] of Object.entries(args)) {
          form.append(key, value as string);
        }

        return {
          url: "/users/me/",
          method: "PUT",
          body: form,
        };
      },
      invalidatesTags: ["User"],
    }),
    verify: builder.mutation<undefined, void>({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    getLandlord: builder.query<User, string>({
      query: (args) => ({
        url: `/users/${args}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginWithSocialMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRetrieveUserQuery,
  useUpdateUserMutation,
  useVerifyMutation,
  useGetLandlordQuery
} = userSlice;
