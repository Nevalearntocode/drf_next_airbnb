"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, MessageSquare, LogOut, Menu, Ticket } from "lucide-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoLockClosed } from "react-icons/io5";
import Image from "next/image";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type Props = {};

const UserButton = (props: Props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleSignInClick = () => {
    router.push("/signin");
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  const renderDropdownMenuItems = () => {
    if (isAuthenticated) {
      return (
        <>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/properties/me")}>
            My Properties
            <Briefcase className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/reservations/me")}>
            My Reservations
            <Ticket className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/conversations")}>
            My Inbox
            <MessageSquare className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Logout
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </>
      );
    } else {
      return (
        <>
          <DropdownMenuItem onClick={handleSignInClick}>
            Sign In
            <IoLockClosed className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignUpClick}>
            Sign Up
            <AiOutlineUserAdd className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </>
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={`outline`} className="rounded-full">
          <Menu className="mr-2 h-5 w-5" />
          <Image
            src={`/images/placeholder.jpg`}
            width={32}
            height={32}
            alt={`avatar`}
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {renderDropdownMenuItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
