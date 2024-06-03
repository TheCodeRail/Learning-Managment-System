import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900 pt-14">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class=" mb-4 text-2xl font-bold tracking-tight leading-none md:text-2xl xl:text-4xl dark:text-white">
              Explore MERN Fullstack Development Cohort
            </h1>
            <p class="max-w-2xl mb-6 font-normal text-black lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Welcome aboard the CodingRail! 🚂 Destination: Full Stack Mastery.
              Join our full stack adventure and master the art of building
              awesome websites from frontend finesse to backend brilliance
            </p>

            <a
              href="https://steadfast-universe-cdf.notion.site/Full-Stack-Web-Development-Cohort-2e4ed57f84404cce972e23f34f10c953"
              target="_blank"
            >
              <Button>View Cohort Syllabus</Button>
            </a>
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://myways-public-data-prod.s3.ap-south-1.amazonaws.com/myways-resource-library/blogs/stats-related-to-mern-stack-in-industry_Image_blogs.jpg"
              alt="mockup"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
