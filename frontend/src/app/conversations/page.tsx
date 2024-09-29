import React from "react";
import ConversationList from "./conversation-list";

type Props = {};

const Conversations = (props: Props) => {
  return (
    <main className="relative h-full w-full md:container md:*:pb-6">
      <div className="fixed z-10 flex w-full items-center bg-white">
        <h1 className="hidden text-2xl font-bold md:flex">Conversations</h1>
      </div>
      <ConversationList />
    </main>
  );
};

export default Conversations;
