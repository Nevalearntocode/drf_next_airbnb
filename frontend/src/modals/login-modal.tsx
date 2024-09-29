"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { IoLockOpen } from "react-icons/io5";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { closeModal, openModal } from "@/redux/features/modal-slice";
import { useLoginMutation } from "@/redux/features/user-slice";
import { setAuth, setLoading } from "@/redux/features/auth-slice";
import { continueWithGoogleAuth } from "@/lib/oauth";

type Props = {};

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type formType = z.infer<typeof formSchema>;

const LoginModal = ({}: Props) => {
  const { type, isOpen } = useAppSelector((state) => state.modal);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isModalOpen = type === "login" && isOpen;

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = (data: formType) => {
    dispatch(setLoading(true));
    login(data)
      .unwrap()
      .then(() => {
        dispatch(setAuth(true));
        toast.success("Login successfully");
        dispatch(closeModal());
        router.refresh();
      })
      .catch((err) => {
        if (err.data) {
          if (Array.isArray(err.data)) {
            for (const error of err.data) {
              toast.error(error);
            }
          } else {
            toast.error(err.data.detail);
          }
        } else {
          console.log(err);
          toast.error("Failed to login");
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-360px flex max-h-[1/4] w-[400px] flex-col items-center justify-center gap-y-4 px-4 pb-2"
        aria-describedby={undefined}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <DialogHeader className="">
            <DialogTitle>
              <p className="text-2xl font-semibold">Login</p>
            </DialogTitle>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-y-2 px-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="username@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center"
              type="submit"
            >
              <p className="m-auto">Log In</p>
              <IoLockOpen size={18} />
            </Button>
          </form>
        </Form>
        <DialogFooter className="mb-2 w-full px-8">
          <div className="flex w-full flex-col">
            <div className="mb-4 flex w-full gap-x-4">
              <Button
                disabled={isLoading}
                className="flex w-full items-center justify-center"
                onClick={continueWithGoogleAuth}
                variant={"outline"}
              >
                <p className="m-auto">Google</p>
                <FcGoogle size={18} />
              </Button>
            </div>
            <Button
              disabled={isLoading}
              variant={"link"}
              onClick={() => {
                dispatch(openModal("register"));
              }}
              size={"sm"}
            >
              Create a new account
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
