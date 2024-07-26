"use client";

import { useGetPropertyDetailsQuery } from "@/redux/features/property-slice";
import EditingPropertyReservations from "./editing-proprety-reservations";
import EditingPropertyInfo from "./editing-proprety-info";
import { Separator } from "@/components/ui/separator";

type Props = {
  propertyId: string;
};

export default function EditingProperty({ propertyId }: Props) {
  const { data } = useGetPropertyDetailsQuery({ id: propertyId });

  if (!data) return null;

  return (
    <div className="mt-8 flex h-[70vh] gap-8">
      <EditingPropertyInfo property={data} />
      <Separator orientation="vertical" />
      <EditingPropertyReservations />
    </div>
  );
}
