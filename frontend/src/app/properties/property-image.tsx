import Image from "next/image";
import React from "react";

type Props = {};

const PropertyImage = (props: Props) => {
  return (
    <div className="relative mt-12 h-[64vh] w-full overflow-hidden rounded-xl pb-6">
      <Image
        src={`/examples/modern.jpg`}
        alt={"cave"}
        fill
        sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
        className="rounded-xl object-cover transition duration-1000 hover:scale-110"
      />
    </div>
  );
};

export default PropertyImage;
