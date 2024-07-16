"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, MessageSquare, LogOut, Menu, Ticket } from "lucide-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoLockOpen } from "react-icons/io5";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { openModal } from "@/redux/features/modal-slice";
import { useLogoutMutation } from "@/redux/features/user-slice";
import {
  setAuth,
  setLoading,
} from "@/redux/features/auth-slice";

type Props = {};

const UserButton = (props: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleSignInClick = () => {
    dispatch(openModal("login"));
  };

  const handleSignUpClick = () => {
    dispatch(openModal("register"));
  };

  const onLogOut = () => {
    dispatch(setLoading(true));
    logout()
      .unwrap()
      .then(() => {
        dispatch(setAuth(false));
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
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
          <DropdownMenuItem onClick={onLogOut}>
            Logout
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </>
      );
    } else {
      return (
        <>
          <DropdownMenuItem onClick={handleSignInClick}>
            Log In
            <IoLockOpen className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignUpClick}>
            Register
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
