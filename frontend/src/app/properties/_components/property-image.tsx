import HeartToggle from "@/app/_components/properties/heart-toggle";
import { Button } from "@/components/ui/button";
import { useOwnerCheck } from "@/hooks/use-owner-check";
import { Favorite } from "@/types/property";
import { User } from "@/types/user";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  image: string;
  landlord: User;
  name: string;
  favorites: Favorite[];
  id: string;
};

const PropertyImage = ({ image, name, favorites, id, landlord }: Props) => {
  const { isOwner } = useOwnerCheck(landlord.id);

  const router = useRouter();

  const onEdit = () => {
    router.push(`/properties/${id}/edit`);
  };

  return (
    <div className="relative mt-12 h-[64vh] w-full overflow-hidden rounded-xl pb-6">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
        className="rounded-xl object-cover transition duration-1000 hover:scale-110"
      />
      {!isOwner && <HeartToggle favorites={favorites} id={id} />}
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
    </div>
  );
};

export default PropertyImage;
