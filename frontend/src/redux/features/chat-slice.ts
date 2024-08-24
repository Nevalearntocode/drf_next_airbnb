import { Conversation, Messages } from "@/types/chat";
import { apiSlice } from "../services/api-slice";

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      query: () => ({
        url: "/conversations/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: "Conversations", id }) as const,
              ),
              {
                type: "Conversations",
                id: "LIST",
              },
            ]
          : [{ type: "Conversations", id: "LIST" }],
    }),
    getConversationDetails: builder.query<Conversation, string>({
      query: (id) => ({
        url: `/conversations/${id}/`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Conversations", id: result.id },
              { type: "Conversations", id: "DETAIL" },
            ]
          : [{ type: "Conversations", id: "DETAIL" }],
    }),
    getConversationMessage: builder.query<
      Messages,
      { conversation?: string; page?: number }
    >({
      query: (args) => {
        let url = "/messages/";

        if (args.conversation) {
          url += `?conversation=${args.conversation}`;
        }

        if (args.page) {
          url += `&page=${args.page}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(
                ({ id }) => ({ type: "Messages", id }) as const,
              ),
              {
                type: "Messages",
                id: "LIST",
              },
            ]
          : [{ type: "Messages", id: "LIST" }],
    }),
    sendMessage: builder.mutation<void, { receiver: string; content: string }>({
      query: (args) => ({
        url: "/messages/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: [
        { type: "Messages", id: "LIST" },
        { type: "Conversations", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationDetailsQuery,
  useGetConversationMessageQuery,
  useSendMessageMutation,
} = chatSlice;
