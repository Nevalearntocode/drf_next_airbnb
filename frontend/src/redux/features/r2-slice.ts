import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const r2Slice = createApi({
  reducerPath: "r2Api",
  baseQuery,
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
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
    deleteImage: builder.mutation({
      query: (args: { url: string }) => {
        return {
          url: args.url,
          method: "DELETE",
        };
      },
    })
  }),
});

export const { useUploadImageMutation } = r2Slice;
