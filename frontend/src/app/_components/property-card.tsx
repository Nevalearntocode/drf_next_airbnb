import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

type Props = {};

const PropertyCard = (props: Props) => {
  return (
    <Card className="rounded-xl px-2 pt-2">
      <CardContent className="relative aspect-[16/12] w-full p-0 pb-2">
        <Image
          src={"/examples/cave.jpg"}
          alt={"cave"}
          fill
          className="h-auto w-auto rounded-xl"
        />
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
