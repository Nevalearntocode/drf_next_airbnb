"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { cn } from "@/lib/utils";
import { closeModal } from "@/redux/features/modal-slice";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

type Props = {};

export default function DateModal({}: Props) {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<Date | null>(null);

  const isModalOpen = (type === "check-in" || type === "check-out") && isOpen;
  const onClose = () => {
    dispatch(closeModal());
  };
  const onConfirm = () => {
    const url = new URL(window.location.href);
    if (type === "check-in" || type === "check-out") {
      url.searchParams.set(type, value ? format(value, "yyyy-MM-dd") : "");
    }
    window.history.replaceState({}, "", url.toString());
    dispatch(closeModal());
  };

  const onClear = () => {
    const url = new URL(window.location.href);
    if (type === "check-in" || type === "check-out") {
      url.searchParams.delete(type);
    }
    window.history.replaceState({}, "", url.toString());
    dispatch(closeModal());
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select {type}</DialogTitle>
          <DialogDescription>
            Select {type} date that you would like to stay
          </DialogDescription>
        </DialogHeader>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "EE, dd MMM yyyy") : "Add date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={value ?? undefined}
              selected={value ?? undefined}
              onSelect={(value) => setValue(value ?? null)}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
        <DialogFooter className="mt-12">
          <div className="flex w-full justify-between gap-8">
            <Button variant={"outline"} className="w-full" onClick={onClear}>
              Clear {type} date
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
