import React from "react";
import SearchFilter from "./search-filter";
import UserButton from "./user-button";
import AddPropertyButton from "./add-property-button";
import Logo from "./logo";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex items-center justify-center">
      <div className="container fixed top-0 z-10 w-full border-b bg-white py-6">
        <div className="flex items-center justify-between">
          <Logo />
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
