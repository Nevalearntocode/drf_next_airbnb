"use client";

import Counter from "@/components/form/counter";
import SelectLocation from "@/components/select-location";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SEARCHSTEPS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { cn } from "@/lib/utils";
import { closeModal } from "@/redux/features/modal-slice";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

type Props = {};

export default function SearchModal({}: Props) {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(0);
  const [searchStep, setSearchStep] = useState<SEARCHSTEPS>(SEARCHSTEPS.NAME);

  const onBack = () => {
    setSearchStep((value) => value - 1);
  };

  const onNext = () => {
    setSearchStep((value) => value + 1);
  };

  const isModalOpen = isOpen && type === "search";
  const onOpenChange = () => {
    dispatch(closeModal());
  };

  const onSearch = () => {
    const url = new URL(window.location.href);
    if (guests > 0) {
      url.searchParams.set("guests", guests.toString());
    }
    if (location !== "") {
      url.searchParams.set("location", location);
    }
    if (dateRange.from) {
      url.searchParams.set("check-in", format(dateRange.from, "yyyy-MM-dd"));
    }
    if (dateRange.to) {
      url.searchParams.set("check-in", format(dateRange.to, "yyyy-MM-dd"));
    }
    if (name && name !== "") {
      url.searchParams.set("name", name);
    }
    window.history.replaceState({}, "", url.toString());
    onOpenChange();
    setLocation("");
    setDateRange({ from: undefined, to: undefined });
    setGuests(0);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="opacity-60">
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          {searchStep === SEARCHSTEPS.NAME && (
            <div className="mt-4">
              <h3 className="mb-4 font-semibold">Property name</h3>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          {searchStep === SEARCHSTEPS.LOCATION && (
            <SelectLocation value={location} setValue={setLocation} />
          )}
          {searchStep === SEARCHSTEPS.DATES && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "EE, dd MMM yyyy")} -{" "}
                        {format(dateRange.to, "EE, dd MMM yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "EE, dd MMM yyyy")
                    )
                  ) : (
                    <span>Select dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from ?? undefined}
                  selected={dateRange}
                  onSelect={(range) => setDateRange(range as DateRange)}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          )}
          {searchStep === SEARCHSTEPS.GUESTS && (
            <Counter
              onChange={setGuests}
              subtitle="How many friends are you bringing with?"
              title=""
              value={guests}
            />
          )}
          <DialogFooter className="mt-4">
            <div className="flex w-full items-center gap-4">
              <Button
                variant={"outline"}
                className="w-2/4"
                onClick={(e) => {
                  e.preventDefault();
                  if (searchStep === SEARCHSTEPS.NAME) {
                    onOpenChange();
                  } else {
                    onBack();
                  }
                }}
              >
                Back
              </Button>
              <Button
                variant={"destructive"}
                className={cn(
                  "ml-auto w-2/4",
                  searchStep === SEARCHSTEPS.GUESTS && "p-0",
                )}
                onClick={
                  searchStep < SEARCHSTEPS.GUESTS
                    ? (e) => {
                        e.preventDefault();
                        onNext();
                      }
                    : () => onSearch()
                }
              >
                {searchStep === SEARCHSTEPS.GUESTS ? "Search" : "Next"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
