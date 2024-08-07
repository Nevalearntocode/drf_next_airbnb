import { ShortenReservation } from "./reservations";
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
  fee_percentage: number;
  image: string;
  created_at: string;
};

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
  // | "image"
> & {
  image: string | null;
  image_file: File | null;
};
type PropertyWithLandlord = Property & { landlord: User };

type PropertyWithLandlordAndReservation = PropertyWithLandlord & {
  reservations: ShortenReservation[];
};

type PropertyList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PropertyWithLandlord[];
};

type PropertyRoute = "all" | "landlord" | "favorite" | "me";

export type {
  Property,
  PropertyList,
  PropertyRoute,
  PropertyWithLandlord,
  PropertyForm,
  PropertyWithLandlordAndReservation,
};
