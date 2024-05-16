import React, { useState } from "react";
import Navbar from "@/webcomponents/Navbar";
import { Button } from "@/components/ui/button";

const EnrollNow = () => {
  const [course, setCourse] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(course);
  }
  return (
    <>
      <Navbar />
      <section class="bg-white dark:bg-gray-900 pt-5 mt-10">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Enroll Now
          </h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Its Great To Hear That You Liked Our Course!
          </p>
          <form action="#" class="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
            <div>
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Full Name
              </label>

              <input
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="john doe"
                required
              />
            </div>
            <div>
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Subscription
              </label>
              <select
                id="course"
                name="course"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Subscription</option>
                <option value="Monthly Subscription">
                  Monthly Subscription
                </option>
                <option value="Lifetime Subscription">
                  Lifetime Subscription
                </option>
              </select>
            </div>
            <Button>
              <button type="submit">Request for Enrollment</button>
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EnrollNow;
