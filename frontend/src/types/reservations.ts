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
  created_at: Date;
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

type UpdateReservationForm = Pick<
  ReservationForm,
  "check_in" | "check_out" | "guests"
>;

export type {
  Reservation,
  ReservationWithPropertyWithLandlord,
  ShortenReservation,
  ReservationForm,
  UpdateReservationForm,
};
