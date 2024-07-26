"use client";

import React from "react";
import ReduxProvider from "./redux-provider";
import ModalProvider from "./modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./auth-provider";

type Props = {
  children: React.ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return (
    <ReduxProvider>
      <AuthProvider>
        <ModalProvider />
        <Toaster />
        {children}
      </AuthProvider>
    </ReduxProvider>
  );
};

export default RootProvider;
