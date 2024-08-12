"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, LogOut, Menu, Ticket, UserRound } from "lucide-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoLockOpen } from "react-icons/io5";
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
import { setAuth, setLoading, setUser } from "@/redux/features/auth-slice";
import { UserAvatar } from "@/components/user-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {};

const UserButton = (props: Props) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
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
        dispatch(setUser(undefined));
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
    if (isAuthenticated && user) {
      return (
        <>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="">
            <Link
              href={"/properties/me"}
              className="flex w-full items-center justify-between"
            >
              Profile & Properties
              <UserRound className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={"/reservations/me"}
              className="flex w-full items-center justify-between"
            >
              Reservations
              <Ticket className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={"/conversations"}
              className="flex w-full items-center justify-between"
            >
            Inbox
            <MessageSquare className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
        <Button
          variant={`outline`}
          className="flex justify-between rounded-full py-6 pr-1 shadow-md"
        >
          <Menu className="mr-2 h-5 w-5" />
          {user ? (
            <UserAvatar
              name={user.name}
              image={user.avatar ?? undefined}
              currentUser
            />
          ) : (
            <Avatar>
              <AvatarImage src="/images/placeholder.jpg" />
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {renderDropdownMenuItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
