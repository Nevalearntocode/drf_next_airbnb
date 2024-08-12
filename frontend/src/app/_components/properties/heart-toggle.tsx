"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { cn } from "@/lib/utils";
import { useFavoriteToggleMutation } from "@/redux/features/favorite-slice";
import { openModal } from "@/redux/features/modal-slice";
import { Favorite } from "@/types/property";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

type Props = {
  favorites: Favorite[];
  id: string;
};

const HeartToggle = ({ favorites, id }: Props) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const isFavorite = favorites.some((favorite) => favorite.user === user?.id);

  const [favorited, setFavorited] = useState(isFavorite);
  const [favoriteToggle] = useFavoriteToggleMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFavorited(isFavorite);
  }, [isAuthenticated, isFavorite]);

  const onFavorite = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isAuthenticated) {
      dispatch(openModal("login"));
      toast.info("Please login to favorite property");
      return;
    }
    setFavorited(!favorited);

    favoriteToggle({ property: id }).unwrap();
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
        size={26}
        className={cn(
          "fill-neutral-500/70 transition duration-500 hover:scale-110 hover:fill-neutral-500",
          favorited && "fill-rose-500 hover:fill-rose-300",
        )}
      />
    </Button>
  );
};

export default HeartToggle;
