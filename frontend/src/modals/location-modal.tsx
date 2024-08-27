"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCountries } from "@/hooks/use-countries";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { cn } from "@/lib/utils";
import { closeModal } from "@/redux/features/modal-slice";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

type Props = {};

export default function LocationModal({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const { getAll } = useCountries();
  const countries = getAll();

  const isModalOpen = type === "location" && isOpen;
  const onClose = () => {
    dispatch(closeModal());
  };

  const onConfirm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("location", value);
    window.history.replaceState({}, "", url.toString());
    onClose();
  };

  const onClear = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("location");
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
          <DialogDescription>
            Select the country where you want to book a reservation
          </DialogDescription>
        </DialogHeader>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {value
                ? countries.find((country) => country.country === value)
                    ?.country
                : "Select country..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.country}
                      value={country.country}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country.country
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {country.country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogFooter className="mt-12">
          <div className="flex w-full justify-between gap-8">
            <Button variant={"outline"} onClick={onClear} className="w-full">
              Clear location
            </Button>
            <Button className="w-full" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
