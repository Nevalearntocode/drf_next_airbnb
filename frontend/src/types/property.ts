import { User } from "./user";

type Property = {
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

type PropertyRoute = "all" | "landlord" | "favorite" | "me";

export type { Property, PropertyList, PropertyRoute };
