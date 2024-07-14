"use client";

import React from "react";
import ReduxProvider from "./redux-provider";
import ModalProvider from "./modal-provider";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return (
    <ReduxProvider>
      <ModalProvider />
      <Toaster />
      {children}
    </ReduxProvider>
  );
};

export default RootProvider;
