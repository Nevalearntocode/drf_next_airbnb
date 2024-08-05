import { PropertyWithLandlord } from "./property";
import { User } from "./user";

type Reservation = {
  id: string;
  property: string;
  guest: User;
  guests: number;
  total: number;
  nights: number;
  check_in: string;
  check_out: string;
  status: "reserved" | "ongoing" | "ended";
  created_at: Date;

  image_url: string;
  property_name: string;
};

type ReservationWithPropertyWithLandlord = Pick<
  Reservation,
  | "id"
  | "guest"
  | "guests"
  | "total"
  | "nights"
  | "check_in"
  | "check_out"
  | "created_at"
> & { property: PropertyWithLandlord };

type ShortenReservation = Pick<Reservation, "id" | "check_in" | "check_out">;

type ReservationForm = {
  property: string;
  check_in: string;
  check_out: string;
  guests: number;
};

type UpdateReservationForm = Omit<ReservationForm, "property">;

export type {
  Reservation,
  ReservationWithPropertyWithLandlord,
  ShortenReservation,
  ReservationForm,
  UpdateReservationForm,
};
