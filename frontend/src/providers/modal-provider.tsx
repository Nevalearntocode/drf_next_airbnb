"use client";

import AddPropertyModal from "@/modals/add-property-modal";
import ChangePasswordModal from "@/modals/change-password-modal";
import ChangeScheduleModal from "@/modals/change-schedule-modal";
import ConfirmModal from "@/modals/confirm-modal";
import DateModal from "@/modals/date-modal";
import GuestModal from "@/modals/guest-modal";
import LocationModal from "@/modals/location-modal";
import LoginModal from "@/modals/login-modal";
import RegisterModal from "@/modals/register-modal";
import SearchModal from "@/modals/search-modal";
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
      <LocationModal />
      <DateModal />
      <GuestModal />
      <SearchModal />
      <ChangePasswordModal />
      <ChangeScheduleModal />
    </>
  );
};

export default ModalProvider;
