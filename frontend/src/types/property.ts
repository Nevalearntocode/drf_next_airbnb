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
  bedrooms: number;
  baths: number;
  image: string;
  created_at: string;
};

type PropertyWithLandlord = Property & { landlord: User };

type PropertyList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Property[];
};

type PropertyRoute = "all" | "landlord" | "favorite" | "me";

export type { Property, PropertyList, PropertyRoute, PropertyWithLandlord };
