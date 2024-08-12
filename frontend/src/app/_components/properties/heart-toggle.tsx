"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/use-redux-store";
import { cn } from "@/lib/utils";
import { openModal } from "@/redux/features/modal-slice";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

type Props = {
  isAuthenticated: boolean;
  defaultState: boolean;
};

const HeartToggle = ({ isAuthenticated, defaultState }: Props) => {
  const [favorited, setFavorited] = useState(defaultState);
  const dispatch = useAppDispatch();

  useEffect(() => {});

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
