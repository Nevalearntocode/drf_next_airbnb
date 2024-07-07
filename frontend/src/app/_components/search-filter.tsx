import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const SearchFilter = (props: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex h-[64px] flex-row items-center justify-between rounded-full border">
        <div className="hidden lg:block">
          <div className="flex h-[48px] flex-row items-center justify-between lg:h-[64px]">
            <Button
              className="flex h-full w-[250px] flex-col justify-center rounded-full px-8"
              variant={`ghost`}
            >
              <p className="text-xs font-semibold">Where</p>
              <p className="text-sm">Wanted location</p>
            </Button>
            <Button
              className="flex h-full flex-col justify-center rounded-full px-8"
              variant={`ghost`}
            >
              <p className="text-xs font-semibold">Check in</p>
              <p className="text-sm">Add dates</p>
            </Button>
            <Button
              className="flex h-full flex-col justify-center rounded-full px-8"
              variant={`ghost`}
            >
              <p className="text-xs font-semibold">Check out</p>
              <p className="text-sm">Add dates</p>
            </Button>
            <Button
              className="flex h-full flex-col justify-center rounded-full px-8"
              variant={`ghost`}
            >
              <p className="text-xs font-semibold">Who</p>
              <p className="text-sm">Add guests</p>
            </Button>
          </div>
        </div>
        <div className="p-2">
          <Button
            variant={`default`}
            className="flex items-center justify-center rounded-full"
            size={`icon`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
