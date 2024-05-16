import React, { useState } from "react";
import Navbar from "@/webcomponents/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { message } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  async function handleReset(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/api/forgotPassword`,
        {
          email: email,
        }
      );
      message.success(res.data.msg);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }
  return (
    <>
      <Navbar />
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h2>
            <p>A change password link will be sent to your mail</p>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <Button>
                <button onClick={handleReset}>Reset passwod</button>
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
