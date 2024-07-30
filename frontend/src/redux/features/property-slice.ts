import {
  PropertyForm,
  PropertyList,
  PropertyWithLandlordAndReservation,
} from "@/types/property";
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
      providesTags: ["Properties"],
    }),
    getCurrentUserProperties: builder.query<PropertyList, getPropertiesArgs>({
      query: (args) => {
        const params = paramsAppender(args);
        return {
          url: `/properties/me/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["MyProperties"],
    }),
    getPropertyDetails: builder.query<
      PropertyWithLandlordAndReservation,
      { id: string }
    >({
      query: (args) => ({
        url: `/properties/${args.id}/`,
        method: "GET",
      }),
      providesTags: ["Property"],
    }),
    addProperty: builder.mutation({
      query: (args: PropertyForm) => ({
        url: "/properties/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Property", "MyProperties"],
    }),
    updateProperty: builder.mutation({
      query: (args: { id: string; data: PropertyForm }) => ({
        url: `/properties/${args.id}/`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Property", "MyProperties", "Properties"],
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  useGetCurrentUserPropertiesQuery,
  useGetPropertyDetailsQuery,
  useAddPropertyMutation,
  useUpdatePropertyMutation,
} = propertySlice;
