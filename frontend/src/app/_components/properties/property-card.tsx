"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import HeartToggle from "./heart-toggle";
import { useRouter } from "next/navigation";
import { PropertyWithLandlord } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useOwnerCheck } from "@/hooks/use-owner-check";

type Props = {
  property: PropertyWithLandlord;
};

const PropertyCard = ({ property }: Props) => {
  const router = useRouter();
  const { isOwner, user } = useOwnerCheck(
    property.landlord.id,
  );

  const onClick = () => {
    router.push(`/properties/${property.id}`);
  };

  const onEdit = () => {
    router.push(`/properties/${property.id}/edit`);
  };

  return (
    <Card className="rounded-xl border-b border-none">
      <CardContent
        className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl p-0 pb-2"
        onClick={onClick}
      >
        <Image
          src={property.image}
          alt={property.name}
          fill
          priority={true}
          sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
          className="h-auto w-auto rounded-xl object-cover transition duration-1000 hover:scale-110"
        />
        {!isOwner && <HeartToggle {...property} />}
        {isOwner && (
          <Button
            variant={"ghost"}
            className="absolute right-0 top-0 flex items-center justify-center hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            size={"icon"}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-5 w-5 text-primary transition duration-1000 hover:scale-110" />
          </Button>
        )}
      </CardContent>
      <CardFooter className="p-2">
        <div>
          <p className="line-clamp-1 text-sm">{property.name}</p>
          <p className="text-sm font-semibold text-muted-foreground">
            ${property.price}
          </p>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {property.address}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
