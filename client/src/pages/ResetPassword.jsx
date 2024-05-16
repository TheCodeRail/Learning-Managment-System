import React, { useState } from "react";
import Navbar from "@/webcomponents/Navbar";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const id = useParams("id");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  async function handleReset(e) {
    e.preventDefault();
    if (password !== confirm) {
      return message.error("Password Does Not Match");
    }
    try {
      console.log(password, confirm);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/api/changePassword`,
        {
          id: id,
          password: password,
        }
      );
      message.success(res.data.msg);
      navigate("/signIn");
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
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="*******"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Confirm Password
                </label>
                <input
                  type="text"
                  onChange={(e) => setConfirm(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="******"
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

export default ResetPassword;
