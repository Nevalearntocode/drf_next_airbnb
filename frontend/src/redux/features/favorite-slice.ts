import { apiSlice } from "../services/api-slice";

export const favoriteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    favoriteToggle: builder.mutation({
      query: (args: { property: string }) => ({
        url: `/favorites/`,
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["MyProperties", "Properties", "Property"],
    }),
  }),
});
