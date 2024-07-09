import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const Conversation = (props: Props) => {
  return (
    <div className="rounded-xl border border-gray-300 px-6 py-4 shadow-xl">
      <p className="mb-6 text-xl">John Doe</p>
      <Button variant={`link`} className="p-0">
        Go to conversation
      </Button>
    </div>
  );
};

export default Conversation;
