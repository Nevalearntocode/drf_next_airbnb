"use client";

import React from "react";
import { categories } from "@/constants";
import Category from "./category";
import PropertyList from "../properties/property-list";

type Props = {};

const Categories = (props: Props) => {
  return (
    <div className="container flex cursor-pointer flex-col items-center pb-6 pt-3">
      <div className="grid w-full grid-flow-col grid-rows-3 py-4 md:grid-rows-2 xl:grid-rows-1">
        {categories.map((item) => (
          <Category
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
      <PropertyList />
    </div>
  );
};

export default Categories;
