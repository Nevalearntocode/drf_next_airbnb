"use client";

import { PropertyFormType } from "@/modals/add-property-modal";
import React, { useEffect, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type Props = {
  field: ControllerRenderProps<PropertyFormType, "description">;
  isLoading: boolean;
};

export default function AutoResizeTextArea({ field, isLoading }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [field.value]);

  return (
    <Textarea
      {...field}
      ref={textareaRef}
      disabled={isLoading}
      placeholder="Add a description"
      className="resize-none overflow-hidden"
    />
  );
}
