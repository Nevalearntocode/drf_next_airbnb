import React from "react";
import Conversation from "./conversation";

type Props = {};

const Conversations = (props: Props) => {
  return (
    <main className="">
      <h1 className="my-6 text-2xl font-bold">Conversations</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </main>
  );
};

export default Conversations;
