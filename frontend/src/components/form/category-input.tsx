"use client";

import { CategoryConstant } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  onClick: (value: string) => void;
  selected: boolean;
  categoryConstant: CategoryConstant;
};

const CategoryInput = ({ categoryConstant, onClick, selected }: Props) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick(categoryConstant.label);
      }}
      className={cn(
        "grid h-full cursor-pointer grid-flow-row grid-cols-1 gap-3 rounded-xl border-2 border-neutral-200 p-4 transition hover:border-black dark:border-neutral-800",
        selected && "border-black dark:border-white",
      )}
    >
      <div className="flex items-center gap-3">
        <categoryConstant.icon />
        <p className="font-semibold">{categoryConstant.label}</p>
      </div>
      <p className="text-xs text-neutral-500">{categoryConstant.description}</p>
    </div>
  );
};

export default CategoryInput;
