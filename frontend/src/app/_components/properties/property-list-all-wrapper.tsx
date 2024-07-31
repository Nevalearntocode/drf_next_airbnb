"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export const PropertyListAllWrapper = ({ children }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {children}
    </div>
  );
};
