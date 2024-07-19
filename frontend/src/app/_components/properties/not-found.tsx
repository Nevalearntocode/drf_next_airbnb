"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-[55vh] w-full flex-col items-center justify-center gap-8">
      <Image
        src={"/svgs/not-found.svg"}
        alt="notfound"
        width={300}
        height={300}
      />
      <p className="text-center text-xl text-gray-500">
        <span className="text-3xl font-bold">No properties found</span>
      </p>
      {pathname === "/" && (
        <div className="flex flex-col items-center gap-4 text-center text-xl">
          There is no properties with your current filters
          <Button>
            <Link href={"/"}>Return to homepage</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
