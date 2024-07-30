import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="relative flex aspect-video max-h-20 items-center justify-center">
      <Link href={`/`}>
        <Image
          src={`/images/logo.png`}
          priority
          width={150}
          height={50}
          alt={`logo`}
          className="h-auto w-auto"
        />
      </Link>
    </div>
  );
};

export default Logo;
