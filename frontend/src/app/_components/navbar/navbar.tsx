import React from "react";
import SearchFilter from "./search-filter";
import UserButton from "./user-button";
import AddPropertyButton from "./add-property-button";
import Logo from "./logo";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex w-full items-center justify-center">
      <div className="container fixed top-0 z-10 w-full border-b bg-white py-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-2">
            <Logo />
            <div className="flex w-full items-center justify-start md:justify-center">
              <SearchFilter />
            </div>
          </div>
          <div className="flex items-center space-x-0 md:space-x-2 lg:space-x-4 xl:space-x-6">
            <AddPropertyButton />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
