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
    <div className="mt-8 flex h-full gap-8">
      <EditingPropertyInfo property={data} />
      <div className="relative flex items-stretch">
        <Separator orientation="vertical" className="h-full" />
      </div>
      <EditingPropertyReservations />
    </div>
  );
}

// Explanation for separator approach
// Parent Container Height: Ensuring the parent container (in this case, the div with flex gap-8 h-full) has a defined height (h-full).
// Separator Container: Wrapping the Separator component in a div with relative flex items-stretch to make sure it stretches to the full height of its parent container.
// Separator Height: Adding h-full to the Separator component to make it take the full height of its parent.
// TailwindCSS Adjustments
// Make sure your TailwindCSS configuration allows for the utilities used (h-full, flex, etc.). If you still face issues with height, you might need to adjust the styling of the parent containers to ensure they have a defined height. If h-full doesn't work as expected, you can try setting a specific height like h-screen for testing purposes.
