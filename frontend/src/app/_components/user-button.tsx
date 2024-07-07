import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const UserButton = (props: Props) => {
  return (
    <Button variant={`outline`} className="rounded-full">
      <Menu className="mr-2 h-5 w-5" />
      <Image
        src={`/images/placeholder.jpg`}
        width={32}
        height={32}
        alt={`avatar`}
        className="rounded-full"
      />
    </Button>
  );
};

export default UserButton;
