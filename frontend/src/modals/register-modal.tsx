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
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/user-slice";
import { setLoading } from "@/redux/features/auth-slice";
import { setAuth } from "@/redux/features/auth-slice";

type Props = {};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  re_password: z.string().min(1, "Confirm password is required"),
});

type formType = z.infer<typeof formSchema>;

const RegisterModal = ({}: Props) => {
  const { type, isOpen } = useAppSelector((state) => state.modal);
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isModalOpen = type === "register" && isOpen;

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      re_password: "",
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = (data: formType) => {
    dispatch(setLoading(true));
    register(data)
      .unwrap()
      .then(() => {
        login({
          email: data.email,
          password: data.password,
        })
          .unwrap()
          .then(() => {
            dispatch(setAuth(true));
            toast.success("Welcome to Airbnb");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.data.detail);
          });
        dispatch(closeModal());
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        if (err.data.non_field_errors) {
          toast.error(err.data.non_field_errors[0]);
        }
        if (err.data.email) {
          toast.error(err.data.email[0]);
        }
        if (err.data.password) {
          toast.error(err.data.password[0]);
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
              <p className="text-2xl font-semibold">Register</p>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="re_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
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
              <p className="m-auto">Register</p>
              <IoLockOpen size={18} />
            </Button>
          </form>
        </Form>
        <DialogFooter className="mb-2 w-full px-8">
          <div className="flex w-full flex-col">
            {/* <div className="mb-4 flex w-full gap-x-4">
              <Button
                disabled={isLoading}
                className="flex w-full items-center justify-center"
                onClick={() => {}}
                variant={"outline"}
              >
                <p className="m-auto">Google</p>
                <FcGoogle size={18} />
              </Button>
            </div> */}
            <Button
              disabled={isLoading}
              variant={"link"}
              onClick={() => {
                dispatch(openModal("login"));
              }}
              size={"sm"}
            >
              Already have an account?
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
