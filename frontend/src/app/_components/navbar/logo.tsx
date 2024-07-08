import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <Link href={`/`}>
        <Image
          src={`/images/logo.png`}
          width={150}
          height={50}
          alt={`logo`}
          style={{
            height: "auto",
          }}
        />
      </Link>
    </div>
  );
};

export default Logo;
