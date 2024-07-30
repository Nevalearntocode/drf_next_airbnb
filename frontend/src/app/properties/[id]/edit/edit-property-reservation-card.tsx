"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetReservationDetailsQuery } from "@/redux/features/reservation-slice";
import { format } from "date-fns";
import React from "react";

type Props = {
  id: string;
};

export default function EditingPropertyReservationCard({ id }: Props) {
  const { data: reservation } = useGetReservationDetailsQuery({ id });

  if (!reservation) return null;

  const {
    check_in,
    check_out,
    created_at,
    guest,
    guests,
    nights,
    property,
    total,
  } = reservation;

  const { name } = guest;

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {format(new Date(check_in), "PP")} -{" "}
          {format(new Date(check_out), "PP")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <p className="flex justify-between">
            Nights: <span className="font-semibold">{nights}</span>
          </p>
          <p className="flex justify-between">
            Guests: <span className="font-semibold">{guests}</span>
          </p>
          <p className="flex justify-between">
            Price: <span className="font-semibold">${total}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant={"secondary"} className="w-full" size={"sm"}>
          Cancel
        </Button>
        <Button className="w-full" size={"sm"}>
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
}
