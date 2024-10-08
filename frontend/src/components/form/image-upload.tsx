"use client";

import React from "react";
import { ImagePlus, Send, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Props = {
  onChange: (image: File | string) => void;
  onRemove: () => void;
  value: File | null | string;
};

const ImageUpload = ({ onChange, value, onRemove }: Props) => {
  const uploadImageRef = React.useRef<HTMLInputElement>(null);
  const inputImageUrl = React.useRef<HTMLInputElement>(null);

  const handleUrlChange = (value: string) => {
    try {
      new URL(value); // This will throw an error if the URL is invalid
      onChange(value); // Only call onChange if the URL is valid
    } catch (_) {
      toast.error("Please enter a valid URL");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <>
      {value ? (
        <div className="relative flex aspect-video flex-col">
          {typeof value === "string" ? (
            <Image
              src={value}
              alt="Uploaded Image"
              fill
              sizes="( max-width: 768px ) 768px, ( max-width: 1200px ) 768px, 768px"
              className="h-80 w-auto rounded-md"
              priority={true}
            />
          ) : (
            <Image
              src={URL.createObjectURL(value)}
              alt="Uploaded Image"
              fill
              sizes="( max-width: 768px ) 768px, ( max-width: 1200px ) 768px, 768px"
              className="h-80 w-auto rounded-md"
              priority={true}
            />
          )}
          <Button
            className="absolute -right-3 -top-3 m-0 h-6 w-6 rounded-full p-0"
            size={`icon`}
            variant={`destructive`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="relative flex flex-col gap-4">
          <Button
            size={`icon`}
            variant={`ghost`}
            onClick={(e) => {
              e.preventDefault();
              uploadImageRef.current?.click();
            }}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Input
            type="file"
            ref={uploadImageRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
