import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const r2Slice = createApi({
  reducerPath: "apiR2",
  baseQuery,
  endpoints: (builder) => ({
    postImage: builder.mutation({
      query: (args: { image: File; url: string }) => {
        return {
          url: args.url,
          method: "PUT",
          body: args.image,
          headers: {
            "Content-Type": args.image.type,
          },
        };
      },
    }),
  }),
});

export const { usePostImageMutation } = r2Slice;
