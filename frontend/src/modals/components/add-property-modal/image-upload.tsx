"use client";

import React from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onChange: (image: File) => void;
  onRemove: () => void;
  value: File | null | string;
};

const ImageUpload = ({ onChange, value, onRemove }: Props) => {
  const inputImageRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      {value ? (
        <div className="relative">
          {typeof value === "string" ? (
            <Image
              priority={true}
              src={value}
              alt="Uploaded Image"
              width={200}
              height={200}
              className="h-36 w-auto rounded-md"
            />
          ) : (
            <Image
              priority={true}
              src={URL.createObjectURL(value)}
              alt="Uploaded Image"
              width={200}
              height={200}
              className="h-36 w-auto rounded-md"
            />
          )}
          <Button
            className="absolute -left-2 -top-2 m-0 h-6 w-6 rounded-full p-0"
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
        <>
          <Button
            size={`icon`}
            variant={`secondary`}
            onClick={(e) => {
              e.preventDefault();
              inputImageRef.current?.click();
            }}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Input
            type="file"
            ref={inputImageRef}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              onChange(file);
            }}
            className="hidden"
          />
        </>
      )}
    </>
  );
};

export default ImageUpload;
