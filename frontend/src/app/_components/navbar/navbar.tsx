import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchFilter from "./search-filter";
import UserButton from "./user-button";
import AddPropertyButton from "./add-property-button";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="fixed left-0 top-0 z-10 w-full border-b bg-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href={`/`}>
              <Image
                src={`/images/logo.png`}
                width={150}
                height={50}
                alt={`logo`}
              />
            </Link>
          </div>
          <SearchFilter />
          <div className="flex items-center space-x-6">
            <AddPropertyButton />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
