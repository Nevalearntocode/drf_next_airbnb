"use client";

import React, { use } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/user-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-store";
import { closeModal } from "@/redux/features/modal-slice";

type Props = {};

const formSchema = z.object({
  current_password: z
    .string()
    .min(1, { message: "Current password is required" }),
  new_password: z.string().min(1, { message: "New password is required" }),
  re_new_password: z
    .string()
    .min(1, { message: "Confirm password is required" }),
});

type FormType = z.infer<typeof formSchema>;

const ChangePasswordModal = (props: Props) => {
  const [changePassword] = useChangePasswordMutation();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const isModalOpen = isOpen && type === "change-password";
  const dispatch = useAppDispatch();
  const onOpenChange = () => {
    dispatch(closeModal());
  };
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      re_new_password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    changePassword({ ...data })
      .unwrap()
      .then(() => {
        onOpenChange();
        form.reset();
        toast.success("Password changed successfully");
      })
      .catch((err: any) => {
        console.log(err.data)
        if (err.data) {
          if (err.data.current_password){
            toast.error(err.data.current_password[0]);
          }
          if (err.data.new_password){
            toast.error(err.data.new_password[0]);
          }
          if (err.data.re_new_password){
            toast.error(err.data.re_new_password[0]);
          }
          if (err.data.non_field_errors){
            toast.error(err.data.non_field_errors[0]);
          }
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="opacity-60">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              You need to enter your current password and a new password.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="re_new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 flex w-full items-center justify-between">
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant={`secondary`}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default ChangePasswordModal;
