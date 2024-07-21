import {
  Reservation,
  ReservationForm,
  ReservationWithPropertyWithLandlord,
  UpdateReservationForm,
} from "@/types/reservations";
import { apiSlice } from "../services/api-slice";

export const reservationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReservations: builder.query<Reservation[], undefined>({
      query: () => ({
        url: "reservations/",
        method: "GET",
      }),
      providesTags: ["Reservations"],
    }),
    getCurrentUserReservations: builder.query<Reservation[], undefined>({
      query: () => ({
        url: "reservations/me/",
        method: "GET",
      }),
      providesTags: ["MyReservations"],
    }),
    getReservationDetails: builder.query<
      ReservationWithPropertyWithLandlord,
      { id: string }
    >({
      query: (id) => ({
        url: `reservations/${id}/`,
        method: "GET",
      }),
      providesTags: ["Reservation"],
    }),
    addReservation: builder.mutation({
      query: (args: ReservationForm) => ({
        url: "reservations/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Reservations", "MyReservations", "Property"],
    }),
    updateReservation: builder.mutation({
      query: (args: { id: string; reservation: UpdateReservationForm }) => ({
        url: `reservations/${args.id}/`,
        method: "PUT",
        body: args.reservation,
      }),
      invalidatesTags: ["Reservations", "MyReservations"],
    }),
    deleteReservation: builder.mutation({
      query: (args: { id: string }) => ({
        url: `reservations/${args.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservations", "MyReservations"],
    }),
  }),
});

export const {
  useGetAllReservationsQuery,
  useGetCurrentUserReservationsQuery,
  useGetReservationDetailsQuery,
  useAddReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} = reservationSlice;
