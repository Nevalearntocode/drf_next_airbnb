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
  bathrooms: number;
  image: string;
  created_at: string;
};

type ShortenedProperty = Pick<
  Property,
  "id" | "name" | "image" | "address" | "price"
>;

type PropertyForm = Pick<
  Property,
  | "name"
  | "description"
  | "category"
  | "address"
  | "country"
  | "country_code"
  | "price"
  | "guests"
  | "bedrooms"
  | "bathrooms"
  | "image"
>;

type PropertyWithLandlord = Property & { landlord: User };

type PropertyList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShortenedProperty[];
};

type PropertyRoute = "all" | "landlord" | "favorite" | "me";

export type {
  Property,
  PropertyList,
  PropertyRoute,
  PropertyWithLandlord,
  PropertyForm,
  ShortenedProperty,
};
