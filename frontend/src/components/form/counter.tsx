"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
};

function Counter({ onChange, subtitle, title, value }: Props) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value <= 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-semibold">{title}</div>
        <div className="text-sm font-light text-gray-600 dark:text-gray-400">
          {subtitle}
        </div>
      </div>
      <div className="flex w-32 items-center gap-4">
        <Button
          onClick={(e) => {
            e.preventDefault();
            onReduce();
          }}
          variant={"outline"}
          className="mr-auto rounded-full"
          size={"icon"}
          disabled={value <= 1}
        >
          <AiOutlineMinus className="h-4 w-4" />
        </Button>
        {value}
        <Button
          onClick={(e) => {
            e.preventDefault();
            onAdd();
          }}
          variant={"outline"}
          className="ml-auto rounded-full"
          size={"icon"}
        >
          <AiOutlinePlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Counter;
