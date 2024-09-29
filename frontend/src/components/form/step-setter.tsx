"use client";

import React from "react";
import { Button } from "../ui/button";
import { STEPS } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  step: STEPS;
  setStep: React.Dispatch<React.SetStateAction<STEPS>>;
  isLoading: boolean;
  onClose: () => void;
};

export default function StepSetter({
  step,
  setStep,
  isLoading,
  onClose,
}: Props) {
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  return (
    <div className="flex w-full items-center gap-4">
      <Button
        variant={"outline"}
        className="w-2/4"
        onClick={(e) => {
          e.preventDefault();
          if (step === STEPS.CATEGORY) {
            onClose();
          } else {
            onBack();
          }
        }}
      >
        Back
      </Button>
      <Button
        disabled={isLoading}
        variant={"destructive"}
        className={cn("ml-auto w-2/4", step === STEPS.CATEGORY && "p-0")}
        onClick={
          step < STEPS.PRICE
            ? (e) => {
                e.preventDefault();
                onNext();
              }
            : () => {}
        }
      >
        {step === STEPS.PRICE ? "Create" : "Next"}
      </Button>
    </div>
  );
}
