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
      providesTags: (data) =>
        // Safeguard: Check if 'data' exists before mapping
        data
          ? [
              ...data.results.map(({ id }) => ({ type: "Property", id }) as const),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
    }),
    getCurrentUserProperties: builder.query<PropertyList, getPropertiesArgs>({
      query: (args) => {
        const params = paramsAppender(args);
        return {
          url: `/properties/me/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (data) =>
        data
          ? [
              ...data.results.map(({ id }) => ({ type: "Property", id }) as const),
              { type: "MyProperties", id: "LIST" },
            ]
          : [{ type: "MyProperties", id: "LIST" }],
    }),
    getPropertyDetails: builder.query<
      PropertyWithLandlordAndReservation,
      { id: string }
    >({
      query: (args) => ({
        url: `/properties/${args.id}/`,
        method: "GET",
      }),
      providesTags: (result, error, args) => [
        { type: "Property", id: args.id },
      ],
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
      invalidatesTags: [
        { type: "MyProperties", id: "LIST" },
        { type: "Properties", id: "LIST" },
      ],
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
      invalidatesTags: (result, error, args) => [
        { type: "Property", id: args.id },
        { type: "MyProperties", id: "LIST" },
        { type: "Properties", id: "LIST" },
      ],
    }),
    deleteProperty: builder.mutation({
      query: (args: { id: string }) => ({
        url: `/properties/${args.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Property", id: args.id },
        { type: "MyProperties", id: "LIST" },
        { type: "Properties", id: "LIST" },
      ],
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
