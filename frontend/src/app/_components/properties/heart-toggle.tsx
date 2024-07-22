"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const HeartToggle = () => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {});

  const onFavorite = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setFavorited(!favorited);
  };

  return (
    <Button
      className="absolute right-0 top-0 bg-transparent hover:bg-transparent"
      variant={"ghost"}
      size={"icon"}
      onClick={onFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute fill-white transition duration-500 hover:scale-110"
      />
      <AiFillHeart
        size={24}
        className={cn(
          "fill-neutral-500/70 transition duration-500 hover:scale-110 hover:fill-neutral-500",
          favorited &&
            "fill-rose-500 transition duration-500 hover:fill-rose-300",
        )}
      />
    </Button>
  );
};

export default HeartToggle;
