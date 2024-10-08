"use client";

import React from "react";
import PropertyCard from "./property-card";
import { PropertyRoute } from "@/types/property";
import { usePropertyList } from "@/hooks/use-property-list";
import Loading from "@/app/loading";
import PropertyEmpty from "./property-empty";
import { PropertyListAllWrapper } from "./property-list-all-wrapper";
import PropertyPagination from "@/app/properties/_components/proprety-pagination";
import { cn } from "@/lib/utils";

type Props = {
  route: PropertyRoute;
};

const PropertyList = ({ route }: Props) => {
  const { data, isLoading } = usePropertyList(route);

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.results.length === 0) {
    return <PropertyEmpty />;
  }

  return (
    <>
      <div className={cn("container", route === "all" && "mt-8 md:mt-0")}>
        {route === "favorite" && (
          <h1 className="mb-4 text-2xl font-bold">Favorites</h1>
        )}
        {(route === "all" || route === "favorite") && (
          <PropertyListAllWrapper>
            {data.results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </PropertyListAllWrapper>
        )}
        {(route === "me" || route === "landlord") && (
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold">Properties</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {data.results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
        <PropertyPagination pagination={{ ...data }} />
      </div>
    </>
  );
};

export default PropertyList;
