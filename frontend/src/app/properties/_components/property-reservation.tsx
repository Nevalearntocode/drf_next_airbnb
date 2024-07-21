"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ShortenReservation } from "@/types/reservations";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, format, isWithinInterval } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { parseISO } from "date-fns";
import { toast } from "sonner";
import PropertyReservationDateRange from "./property-reservation-date-range";
import PropertyReservationNumberOfGuests from "./property-reservation-number-of-guests";
import PropertyReservationPrice from "./property-reservation-price";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/features/modal-slice";
import { setConfirmHeader } from "@/redux/features/confirm-slice";

type Props = {
  guests: number;
  price: number;
  fee_percentage: number;
  reservations: ShortenReservation[];
  id: string;
};

const formSchema = z.object({
  guests: z.number().min(1, { message: "Please select the number of guests" }),
  dateRange: z.object({
    from: z
      .date({
        required_error: "Please select the check-in date",
      })
      .nullable(),
    to: z
      .date({
        required_error: "Please select the check-out date",
      })
      .nullable(),
  }),
});

export type PropertyReservationFormType = z.infer<typeof formSchema>;

const PropertyReservation = ({
  guests,
  price,
  reservations,
  fee_percentage,
  id,
}: Props) => {
  const dispatch = useDispatch();
  const form = useForm<PropertyReservationFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
      dateRange: {
        from: null,
        to: null,
      },
    },
  });

  const isDisabled = (date: Date) => {
    if (date < new Date()) {
      return true;
    }

    if (reservations && reservations.length > 0) {
      for (const reservation of reservations) {
        const check_in = parseISO(reservation.check_in);
        const check_out = parseISO(reservation.check_out);
        if (isWithinInterval(date, { start: check_in, end: check_out })) {
          return true;
        }
      }
    }

    return false;
  };

  const from = form.watch("dateRange").from;
  const to = form.watch("dateRange").to;

  const nights = from && to ? differenceInDays(to, from) : 1;
  const fee = (price * fee_percentage) / 100;
  const total = Math.floor(price * nights + fee);

  const onHandleGuestsChange = (value: string) => {
    const number = parseInt(value);
    form.setValue("guests", number);
  };

  const onSubmit = (data: PropertyReservationFormType) => {
    const { from, to } = data.dateRange;
    const { guests } = data;

    if (!from || !to) {
      toast.error("Please select the check-in and check-out dates");
      return;
    }

    const check_in = format(from, "yyyy-MM-dd");
    const check_out = format(to, "yyyy-MM-dd");

    dispatch(
      setConfirmHeader({
        title: "Confirm Reservation",
        message: `Are you sure you want to reserve this property?`,
        confirmType: "add-reservation",
        data: {
          reservation: {
            property: id,
            check_in,
            check_out,
            guests,
          },
        },
      }),
    );
    dispatch(openModal("confirm"));
  };

  return (
    <aside className="col-span-2 mt-6 rounded-xl border-gray-300 p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-semibold">${price} per night</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-4 flex flex-col gap-4"
        >
          <PropertyReservationDateRange
            control={form.control}
            isDisabled={isDisabled}
          />
          <PropertyReservationNumberOfGuests
            control={form.control}
            onHandleGuestsChange={onHandleGuestsChange}
            guests={guests}
          />
          <Button className="mb-6 w-full py-6" size={"lg"}>
            Book
          </Button>
        </form>
      </Form>
      <PropertyReservationPrice
        fee={fee}
        price={price}
        nights={nights}
        total={total}
      />
    </aside>
  );
};

export default PropertyReservation;
