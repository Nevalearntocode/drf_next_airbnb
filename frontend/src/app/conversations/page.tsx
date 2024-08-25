import React from "react";
import ConversationList from "./conversation-list";
import { headers } from "next/headers";

type Props = {};

const Conversations = (props: Props) => {

  console.log("headers", headers())

  return (
    <main className="container relative pb-6">
      <div className="fixed z-10 w-full bg-white pt-2">
        <h1 className="text-2xl font-bold">Conversations</h1>
      </div>
        <ConversationList />
    </main>
  );
};

export default Conversations;
