import { PropertyList } from "@/types/property";
import { apiSlice } from "../services/api-slice";
import { getPropertiesArgs } from "@/types/redux";
import { paramsAppender } from "@/lib/utils";

export const propertySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query<PropertyList, getPropertiesArgs>({
      query: (args) => {
        const params = paramsAppender(args);
        return {
          url: `/properties/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getCurrentUserProperties: builder.query<PropertyList, getPropertiesArgs>({
      query: (args) => {
        const params = paramsAppender(args);
        return {
          url: `/properties/me/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllPropertiesQuery, useGetCurrentUserPropertiesQuery } =
  propertySlice;
