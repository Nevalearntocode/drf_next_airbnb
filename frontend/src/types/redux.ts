import { ShortenReservation } from "./reservations";
import { User } from "./user";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
};

type ModalState = {
  isOpen: boolean;
  type:
    | "login"
    | "register"
    | "confirm"
    | "add-property"
    | "location"
    | "check-in"
    | "check-out"
    | "guests"
    | "search"
    | "change-password"
    | "update-reservation"
    | null;
  reservations: ShortenReservation[];
  reservationId: string;
};

type ConfirmState = {
  title: string;
  message: string;
  confirmType:
    | "add-reservation"
    | "delete-property"
    | "delete-message"
    | "cancel-reservation"
    | null;

  reservationFormData: {
    property: string;
    check_in: string;
    check_out: string;
    guests: number;
  };

  deletingPropertyInfo: {
    id: string;
    name: string;
  };

  messageId: string;
  deleteReservationId: string;
};

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterArgs = {
  name: string;
  email: string;
  password: string;
  re_password: string;
};

type getPropertiesArgs = {
  page?: string;
  name?: string;
  id?: string;
  category?: string;
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  landlord?: string;
};

export type {
  AuthState,
  LoginArgs,
  RegisterArgs,
  getPropertiesArgs,
  ModalState,
  ConfirmState,
};
