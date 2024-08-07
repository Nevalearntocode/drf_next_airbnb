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
      query: (args: PropertyForm) => {
        const form = new FormData();

        for (const [key, value] of Object.entries(args)) {
          form.append(key, value as string);
        }

        return {
          url: "/properties/",
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: ["MyProperties", "Properties"],
    }),
    updateProperty: builder.mutation({
      query: (args: { id: string; data: PropertyForm }) => {
        const form = new FormData();

        for (const [key, value] of Object.entries(args.data)) {
          form.append(key, value as string);
        }

        return {
          url: `/properties/${args.id}/`,
          method: "PUT",
          body: form,
        };
      },
      invalidatesTags: ["Property", "MyProperties", "Properties"],
    }),
    deleteProperty: builder.mutation({
      query: (args: { id: string }) => ({
        url: `/properties/${args.id}/`,
        method: "DELETE",
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
  useDeletePropertyMutation,
} = propertySlice;
