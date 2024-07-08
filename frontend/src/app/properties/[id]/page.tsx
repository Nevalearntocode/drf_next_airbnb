import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <main className="pb-6">
      <div className="relative mt-12 h-[64vh] w-full overflow-hidden rounded-xl pb-6">
        <Image
          src={`/examples/modern.jpg`}
          alt={"cave"}
          fill
          sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
          className="rounded-xl object-cover transition duration-1000 hover:scale-110"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-3 py-6 pr-6">
          <h1 className="mb-4 text-4xl">Modern House</h1>
          <span className="mb-6 block text-lg text-gray-600">
            2 guests · 1 bedroom · 1 bed · 1 bath
          </span>
          <Separator />
          <div className="flex items-center space-x-4 py-6">
            <Avatar>
              <AvatarFallback>LL</AvatarFallback>
            </Avatar>
            <p className="text-lg font-bold">Landlord's name</p>
          </div>
          <Separator />
          <p className="mt-6 text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            facere doloremque praesentium blanditiis consequuntur error rem quia
            velit doloribus inventore expedita nulla tempora, quibusdam
            accusamus neque nesciunt laborum vero voluptas?
          </p>
        </div>
        <aside className="col-span-2 mt-6 rounded-xl border-gray-300 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl">$1000 per night</h2>

          <div className="mb-6 rounded-xl border border-gray-300 p-3">
            <label className="mb-2 block text-xs font-bold">Guests</label>
            <select className="-ml-1 w-full text-sm">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </div>
          <Button className="mb-6 w-full py-6" size={"lg"}>
            Book
          </Button>
          <div className="mb-4 flex items-center justify-between">
            <p>$200 * 2 nights</p>
            <p>$400</p>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p>Fee</p>
            <p>$40</p>
          </div>
          <Separator />
          <div className="mt-4 flex items-center justify-between font-bold">
            <p>Total</p>
            <p>$440</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Page;
