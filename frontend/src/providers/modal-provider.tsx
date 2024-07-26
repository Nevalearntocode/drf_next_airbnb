"use client";

import AddPropertyModal from "@/modals/add-property-modal";
import ConfirmModal from "@/modals/confirm-modal";
import LoginModal from "@/modals/login-modal";
import RegisterModal from "@/modals/register-modal";
import React from "react";
import { useState, useEffect } from "react";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <AddPropertyModal />
      <ConfirmModal />
    </>
  );
};

export default ModalProvider;
