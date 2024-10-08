"use client";

import React, { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { closeModal } from "@/redux/features/modal-slice";
import PropertyReservationDateRange from "@/app/properties/_components/property-reservation-date-range";
import PropertyReservationNumberOfGuests from "@/app/properties/_components/property-reservation-number-of-guests";
import { format, isWithinInterval, parseISO } from "date-fns";
import {
  useGetReservationDetailsQuery,
  useUpdateReservationMutation,
} from "@/redux/features/reservation-slice";
import { toast } from "sonner";

type Props = {};

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

type FormType = z.infer<typeof formSchema>;

const ChangeScheduleModal = (props: Props) => {
  const { isOpen, type, reservations, reservationId } = useAppSelector(
    (state) => state.modal,
  );
  const isModalOpen = isOpen && type === "update-reservation";
  const { data: reservation } = useGetReservationDetailsQuery({
    id: reservationId,
  });
  const dispatch = useAppDispatch();
  const [updateReservation, { isLoading: isReservationLoading }] =
    useUpdateReservationMutation();
  const onOpenChange = () => {
    dispatch(closeModal());
  };
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
      dateRange: {
        from: null,
        to: null,
      },
    },
  });

  useEffect(() => {
    if (reservation) {
      form.reset({
        guests: reservation.guests,
        dateRange: {
          from: parseISO(reservation.check_in),
          to: parseISO(reservation.check_out),
        },
      });
    }
  }, [form, reservation]);

  if (reservations.length === 0) {
    return null;
  }

  if (!reservation) {
    return null;
  }

  const { guests } = reservation;

  const isDisabled = (date: Date) => {
    if (date < new Date()) {
      return true;
    }

    if (reservations && reservations.length > 0) {
      for (const reservation of reservations) {
        if (reservation.id === reservationId) {
          continue;
        }
        const check_in = parseISO(reservation.check_in);
        const check_out = parseISO(reservation.check_out);
        if (isWithinInterval(date, { start: check_in, end: check_out })) {
          return true;
        }
      }
    }

    return false;
  };

  const onHandleGuestsChange = (value: string) => {
    const number = parseInt(value);
    form.setValue("guests", number);
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    const { guests, dateRange } = data;
    const from = dateRange.from;
    const to = dateRange.to;

    if (!from || !to) {
      toast.error("Please select the check-in and check-out dates");
      return;
    }

    const check_in = format(from, "yyyy-MM-dd");
    const check_out = format(to, "yyyy-MM-dd");
    const reservation = {
      guests,
      check_in,
      check_out,
    };
    updateReservation({
      id: reservationId,
      reservation,
    })
      .unwrap()
      .then(() => {
        dispatch(closeModal());
      })
      .catch((err) => {
        if (err.data) {
          if (Array.isArray(err.data)) {
            for (const field in err.data) {
              err.data[field].forEach((errorMessage: string) => {
                toast.error(errorMessage);
              });
            }
          } else {
            console.error(err.data);
            toast.error(err.data.non_field_errors[0]);
          }
        } else {
          console.error(err);
          toast.error("Failed to update reservation");
        }
      });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="opacity-60">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>DialogTitle</DialogTitle>
            <DialogDescription>DialogDescription</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <PropertyReservationDateRange
                control={form.control}
                isDisabled={isDisabled}
              />
              <PropertyReservationNumberOfGuests
                control={form.control}
                onHandleGuestsChange={onHandleGuestsChange}
                guests={guests}
              />
              <div className="mt-8 flex w-full justify-end">
                <Button
                  className=""
                  size={"lg"}
                  disabled={isLoading || isReservationLoading}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default ChangeScheduleModal;
