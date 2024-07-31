import PropertyList from "@/app/_components/properties/property-list";
import React from "react";
import Profile from "./profile";
import { Separator } from "@/components/ui/separator";

type Props = {};

const MyPropertiesPage = (props: Props) => {
  return (
    <main className="container">
      <div className="mt-8 flex h-full flex-col gap-8 sm:flex-row">
        <Profile />
        <div className="relative flex items-stretch">
          <Separator orientation="vertical" className="h-full" />
        </div>
        <PropertyList route="me" />
      </div>
    </main>
  );
};

export default MyPropertiesPage;
