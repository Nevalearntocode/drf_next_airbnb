"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  image?: string;
  name: string;
  currentUser?: boolean;
};

export function UserAvatar({ image, name, currentUser }: Props) {
  return (
    <Avatar>
      <AvatarImage src={image} alt={`${name}-avatar`} />
      <AvatarFallback
        className={cn(
          "bg-primary-foreground text-primary",
          currentUser && "bg-primary text-primary-foreground",
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
