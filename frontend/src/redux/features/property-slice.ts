import { PropertyList } from "@/types/property";
import { apiSlice } from "../services/api-slice";
import { getPropertiesArgs } from "@/types/redux";

export const propertySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query<PropertyList, getPropertiesArgs>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.page) {
          params.append("page", args.page.toString());
        }
        if (args.name) {
          params.append("name", args.name);
        }
        if (args.id) {
          params.append("id", args.id);
        }
        return {
          url: `/properties?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getCurrentUserProperties: builder.query<PropertyList, getPropertiesArgs>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.page) {
          params.append("page", args.page.toString());
        }
        if (args.name) {
          params.append("name", args.name);
        }
        if (args.id) {
          params.append("id", args.id);
        }
        return {
          url: `/properties/me/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllPropertiesQuery, useGetCurrentUserPropertiesQuery } = propertySlice;
