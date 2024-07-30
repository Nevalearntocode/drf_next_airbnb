"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Input } from "../ui/input";
import { toast } from "sonner";

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

  const onSet = useCallback(
    (value: number) => {
      if (value >= 100) {
        toast.error(
          "The property size exceeds the allowed limit. Please contact customer support for further assistance.",
        );
        return;
      }

      onChange(value);
    },

    [onChange],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-semibold">{title}</div>
        <div className="flex-1 text-sm font-light text-gray-600 dark:text-gray-400">
          {subtitle}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            onReduce();
          }}
          variant={"ghost"}
          className="rounded-full"
          size={"icon"}
          disabled={value <= 1}
        >
          <AiOutlineMinus className="h-4 w-4" />
        </Button>
        <Input
          value={value.toString()}
          onChange={(e) => onSet(Number(e.target.value))}
          className="w-12 rounded-full text-center"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            onAdd();
          }}
          variant={"ghost"}
          className="rounded-full"
          size={"icon"}
        >
          <AiOutlinePlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Counter;
