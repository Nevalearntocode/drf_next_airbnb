"use client";

import React from "react";
import { categories } from "@/constants";
import Category from "./category";

type Props = {};

const Categories = (props: Props) => {
  return (
    <div className="grid w-full grid-flow-col overflow-auto  py-4 md:grid-rows-2 xl:grid-rows-1">
      {categories.map((item) => (
        <Category
          key={item.label}
          label={item.label}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Categories;
