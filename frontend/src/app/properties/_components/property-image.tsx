import HeartToggle from "@/app/_components/properties/heart-toggle";
import { Favorite } from "@/types/property";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  name: string;
  favorites: Favorite[];
  id: string;
};

const PropertyImage = ({ image, name, favorites, id }: Props) => {
  return (
    <div className="relative mt-12 h-[64vh] w-full overflow-hidden rounded-xl pb-6">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
        className="rounded-xl object-cover transition duration-1000 hover:scale-110"
      />
      <HeartToggle favorites={favorites} id={id} />
    </div>
  );
};

export default PropertyImage;
