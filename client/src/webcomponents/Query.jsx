import { Button } from "@/components/ui/button";
import React from "react";

const Query = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900 pt-14">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7 flex">
            <h1 class=" mb-4 text-2xl font-bold tracking-tight leading-none md:text-2xl xl:text-2xl dark:text-white">
              Send Your Query On Our Mail:{" "}
            </h1>
            <span className="ml-3 pt-2">officialwork1103@gmail.com</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Query;
