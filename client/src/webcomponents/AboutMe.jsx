import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

const AboutMe = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="md:ml-36 ml-11">
            <img
              src="https://avatars.githubusercontent.com/u/101265586?s=400&u=f71d99cc0cba7ee80fc22d705284256236508ee0&v=4"
              alt="Instructor Image"
              className="w-full md:w-auto rounded-full"
              style={{ maxWidth: "300px" }} // Limit max width for responsiveness
            />
          </div>

          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
              About The Instructor
            </h2>
            <p class="mb-6 font-normal text-black md:text-lg dark:text-gray-400">
              Hi there, I'm Akshat Jain, and I'll be your instructor for this
              full stack development cohort. 🎓 Teaching isn't just a job for
              me—it's a passion. That's why I've designed this program to be
              intimate and focused, with a maximum of 8-10 students in each
              batch. 🎯 This allows me to give you my undivided attention and
              ensure you receive the personalized guidance needed to excel in
              full stack development.
            </p>
            <p class="mb-6 font-normal text-black md:text-lg dark:text-gray-400">
              Think of me as your coding sensei—always ready to answer your
              questions, clarify tricky concepts, and help you build projects
              that will make your portfolio stand out. 🤓 So, future full stack
              superstars 🤩 Let's embark on this exciting journey and see what
              amazing things we can accomplish together! 🎉"
            </p>

            <a
              href="#"
              class="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
            >
              <Sheet>
                <SheetTrigger>
                  <Button>More About Instructor</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>More About Akshat Jain</SheetTitle>
                    <SheetDescription>
                      My name is Akshat Jain, currently working as a Frontend
                      developer in a Banglore Startup (WorkCrew AI). I am a
                      passionate software engineer with a strong foundation in
                      computer core subjects. I specialize in the MERN stack and
                      use my skills to create dynamic and efficient web
                      applications. As a fast learner and highly motivated
                      individual, I embrace new challenges and thrive in
                      collaborative environments. I am dedicated to continual
                      growth and innovation, consistently delivering quality
                      work that exceeds expectations.
                    </SheetDescription>
                    <div className="pt-5">
                      <a href="https://github.com/Akshat2Jain" target="_blank">
                        <Button>Github</Button>
                      </a>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
