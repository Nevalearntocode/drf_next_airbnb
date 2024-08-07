import { LoginArgs, RegisterArgs } from "@/types/redux";
import { apiSlice } from "../services/api-slice";
import { User, UserForm } from "@/types/user";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (args: LoginArgs) => ({
        url: "/jwt/create/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Properties", "User"],
    }),
    logout: builder.mutation<undefined, void>({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Properties", "User"],
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
      providesTags: ["User"],
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
    }),
    verify: builder.mutation<undefined, void>({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRetrieveUserQuery,
  useUpdateUserMutation,
  useVerifyMutation,
} = userSlice;
