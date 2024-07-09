import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {};

const ConversationDetail = (props: Props) => {
  return (
    <>
      <div className="flex max-h-[400px] flex-col space-y-4 overflow-auto">
        <div className="w-[80%] rounded-xl bg-gray-200 px-6 py-4">
          <p className="font-bold text-gray-500">John Doe</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at
            voluptatibus eaque mollitia. Consequuntur laborum laboriosam officia
            esse ab asperiores iste, hic necessitatibus, fugiat eveniet, beatae
            quia sunt at repudiandae?
          </p>
        </div>
        <div className="ml-[20%] w-[80%] rounded-xl bg-blue-200 px-6 py-4">
          <p className="font-bold text-gray-500">Neva</p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa at
            voluptatibus eaque mollitia. Consequuntur laborum laboriosam officia
            esse ab asperiores iste, hic necessitatibus, fugiat eveniet, beatae
            quia sunt at repudiandae?
          </p>
        </div>
      </div>
      <div className="mt-4 flex space-x-4 rounded-xl border border-gray-300 px-6 py-4">
        <Input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-xl bg-gray-300 p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button>send</Button>
      </div>
    </>
  );
};

export default ConversationDetail;
