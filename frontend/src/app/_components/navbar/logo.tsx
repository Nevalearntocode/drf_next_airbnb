import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="relative flex aspect-video h-[45px] w-[80px] items-center justify-center md:h-[67.5px] md:w-[120px]">
      <Link href={`/`}>
        <Image
          src={`/images/logo.png`}
          priority
          fill
          alt={`logo`}
          className="h-auto w-auto"
        />
      </Link>
    </div>
  );
};

export default Logo;
