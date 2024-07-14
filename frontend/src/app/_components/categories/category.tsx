"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons/lib";

type Props = {
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
};

const Category = ({ description, icon: Icon, label, selected }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    console.log("clicked");
    const currentCategory = searchParams.get("category");
    const url = new URL(window.location.href);
    if (currentCategory === label) {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", label.toLowerCase());
    }

    router.push(url.toString());
  };
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 dark:hover:text-neutral-200",
        selected
          ? "border-b-neutral-800 text-neutral-800 dark:border-b-neutral-200 dark:text-neutral-200"
          : "border-transparent text-neutral-500",
      )}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default Category;
