"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import HeartToggle from "./heart-toggle";
import { useRouter } from "next/navigation";

type Props = {};

const PropertyCard = (props: Props) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/properties/${1}`);
  };

  return (
    <Card className="rounded-xl border-b border-none">
      <CardContent
        className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl p-0 pb-2"
        onClick={onClick}
      >
        <Image
          src={"/examples/modern.jpg"}
          alt={"cave"}
          fill
          sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
          className="h-auto w-auto rounded-xl object-cover transition duration-1000 hover:scale-110"
        />
        <HeartToggle />
      </CardContent>
      <CardFooter className="p-2">
        <div>
          <p className="text-sm text-muted-foreground">Cave</p>
          <p className="text-sm text-muted-foreground">$1000</p>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
