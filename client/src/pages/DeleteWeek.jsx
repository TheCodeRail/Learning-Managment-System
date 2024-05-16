import React, { useState } from "react";
import AdminNavbar from "@/webcomponents/AdminNavbar";
import { Button } from "@/components/ui/button";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteWeek = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      message.error("Please Fill Feilds");
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/admin/deleteWeek`,
        {
          weekname: name,
        }
      );
      message.success(res.data.msg);
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }
  return (
    <>
      <AdminNavbar />
      <div className="mt-32 lg:mt-14">
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Delete Week
              </h1>
              <p class="font-light text-gray-500 dark:text-gray-400">
                Type the name of the Week to delete the perticular week data
              </p>
              <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Week Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Week 1"
                    required=""
                  />
                </div>
                <Button>
                  <button onClick={handleSubmit}>Delete</button>
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DeleteWeek;
