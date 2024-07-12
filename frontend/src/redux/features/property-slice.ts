import { apiSlice } from "../services/api-slice";
import type { User } from "./user-slice";

export type Property = {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  country: string;
  country_code: string;
  price: number;
  guests: number;
  beds: number;
  baths: number;
  image: string;
  landlord: User;
  created_at: string;
};

type PropertyList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Property[];
};

type getPropertiesArgs = {
  page?: string;
  name?: string;
  id?: string;
};

export const propertySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query<PropertyList, getPropertiesArgs>({
      query: (args: getPropertiesArgs) => {
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
  }),
});

export const { useGetAllPropertiesQuery } = propertySlice;
