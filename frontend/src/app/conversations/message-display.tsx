"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/use-redux-store";
import { cn } from "@/lib/utils";
import {
  setConfirmHeader,
  setDeleteMessageId,
} from "@/redux/features/confirm-slice";
import { openModal } from "@/redux/features/modal-slice";
import { Pencil, Trash } from "lucide-react";
import React from "react";

type Props = {
  id: string;
  content: string;
  isOther: boolean;
  isEdited: boolean;
  isDeleted: boolean;
  handleEdit: (messageId: string) => void;
};

export default function MessageDisplay({
  id,
  content,
  isOther,
  isEdited,
  isDeleted,
  handleEdit,
}: Props) {
  const dispatch = useAppDispatch();

  const onClickDelete = () => {
    dispatch(setDeleteMessageId(id));
    dispatch(openModal("confirm"));
    dispatch(
      setConfirmHeader({
        title: "Delete Message",
        confirmType: "delete-message",
        message: "Are you sure you want to delete this message?",
      }),
    );
  };

  return (
    <div
      className={cn(
        "group flex max-w-[80%] flex-col",
        isOther ? "mr-auto" : "ml-auto",
      )}
    >
      {isDeleted ? (
        <div
          className={cn(
            "relative rounded-xl px-6 py-4",
            isOther ? "bg-gray-200" : "bg-blue-200",
          )}
        >
          <p className="flex items-center text-xs italic text-gray-500">
            This message has been deleted
          </p>
        </div>
      ) : (
        <>
          {isEdited && (
            <p
              className={cn(
                "mr-2 text-xs italic text-gray-500",
                isOther ? "text-left" : "text-right",
              )}
            >
              Edited
            </p>
          )}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "relative rounded-xl px-6 py-4",
                isOther ? "bg-gray-200" : "bg-blue-200",
              )}
            >
              <p className="flex items-center">{content}</p>
            </div>
            {!isOther && (
              <div
                className={cn(
                  "hidden gap-2 group-hover:flex",
                  isOther ? "self-start" : "self-end",
                )}
              >
                <Button
                  className="m-0 p-2"
                  variant={`secondary`}
                  onClick={() => handleEdit(id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  className="m-0 p-2"
                  variant={`destructive`}
                  onClick={onClickDelete}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
