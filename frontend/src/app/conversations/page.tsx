import React from "react";
import ConversationList from "./conversation-list";

type Props = {};

const Conversations = (props: Props) => {
  return (
    <main className="container relative h-full w-full pb-6">
      <div className="fixed z-10 w-full bg-white pt-2">
        <h1 className="text-2xl font-bold">Conversations</h1>
      </div>
      <ConversationList />
    </main>
  );
};

export default Conversations;
