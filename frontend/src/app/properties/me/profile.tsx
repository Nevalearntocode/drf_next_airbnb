"use client";

import React, { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/hooks/use-redux-store";
import ImageUpload from "@/components/form/image-upload";

type Props = {};

const formSchema = z.object({
  name: z.string(),
  avatar: z.union([z.instanceof(File), z.string()]).nullable(),
});

type FormType = z.infer<typeof formSchema>;

const Profile = ({}: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("avatar", user.avatar ?? "");
    }
  }, [user, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-2xl font-bold">Profile</h2>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Avatar</FormLabel>
              <FormControl>
                <ImageUpload
                  onChange={field.onChange}
                  onRemove={() => form.setValue("avatar", "")}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Profile;
