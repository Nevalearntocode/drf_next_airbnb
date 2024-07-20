import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  guests: number;
  price: number;
};

const formSchema = z.object({
  guests: z.number().min(1, { message: "Please select the number of guests" }),
  nights: z.number().min(1, { message: "Please select the number of nights" }),
  dateRange: z.object({
    from: z
      .date({
        required_error: "Start date is required.",
      })
      .nullable(),
    to: z
      .date({
        required_error: "End date is required.",
      })
      .nullable(),
  }),
});

type FormType = z.infer<typeof formSchema>;

const PropertyReservation = ({ guests, price }: Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
      nights: 1,
      dateRange: {
        from: null,
        to: null,
      },
    },
  });

  const total = price * form.watch("nights");

  return (
    <aside className="col-span-2 mt-6 rounded-xl border-gray-300 p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-semibold">${price} per night</h2>

      <div className="mb-6 rounded-xl border border-gray-300 p-3">
        <label className="mb-2 block text-xs font-bold">Guests</label>
        <select className="-ml-1 w-full text-sm focus:outline-none">
          {Array.from({ length: guests }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <Button className="mb-6 w-full py-6" size={"lg"}>
        Book
      </Button>
      <div className="mb-4 flex items-center justify-between">
        <p>${price} * 2 nights</p>
        <p>${price * 2}</p>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <p>Fee</p>
        <p>$40</p>
      </div>
      <Separator />
      <div className="mt-4 flex items-center justify-between font-bold">
        <p>total</p>
        <p>${total}</p>
      </div>
    </aside>
  );
};

export default PropertyReservation;
