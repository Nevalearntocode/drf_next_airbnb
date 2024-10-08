import {
  Reservation,
  ReservationForm,
  ReservationWithPropertyWithLandlord,
  UpdateReservationForm,
} from "@/types/reservations";
import { apiSlice } from "../services/api-slice";

export const reservationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReservations: builder.query<Reservation[], void>({
      query: () => ({
        url: "reservations/",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "Reservation", id }) as const),
              { type: "Reservation", id: "LIST" },
            ]
          : [{ type: "Reservation", id: "LIST" }];
      },
    }),
    getCurrentUserReservations: builder.query<Reservation[], void>({
      query: () => ({
        url: "reservations/me/",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        return result
          ? [
              ...result.map(
                ({ id }) => ({ type: "Reservations", id }) as const,
              ),
              { type: "Reservations", id: "LIST" },
            ]
          : [{ type: "Reservations", id: "LIST" }];
      },
    }),
    getReservationDetails: builder.query<
      ReservationWithPropertyWithLandlord,
      { id: string }
    >({
      query: (args: { id: string }) => ({
        url: `reservations/${args.id}/`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: "Reservations", id: result.id },
              { type: "Reservations", id: "DETAIL" },
            ]
          : [{ type: "Reservations", id: "DETAIL" }];
      },
    }),
    addReservation: builder.mutation({
      query: (args: ReservationForm) => ({
        url: "reservations/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: [{ type: "Reservations", id: "LIST" }],
    }),
    updateReservation: builder.mutation({
      query: (args: { id: string; reservation: UpdateReservationForm }) => ({
        url: `reservations/${args.id}/`,
        method: "PUT",
        body: args.reservation,
      }),
      invalidatesTags: (args) => [
        { type: "Reservations", id: args.id },
        { type: "Reservations", id: "LIST" },
      ],
    }),
    deleteReservation: builder.mutation({
      query: (args: { id: string }) => ({
        url: `reservations/${args.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Reservations", id: "LIST" }],
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
