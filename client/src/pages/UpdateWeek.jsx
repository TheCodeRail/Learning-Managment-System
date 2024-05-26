import React, { useState } from "react";
import AdminNavbar from "@/webcomponents/AdminNavbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const UpdateWeek = () => {
  const [weekName, setWeekName] = useState("");
  const [assignment, setAssignment] = useState("");
  const [recording, setRecording] = useState("");
  const [lecture, setLecture] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!weekName) {
      return message.error("Week Name is Mandatory");
    }
    const recordingLinks = recording.trim();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/admin/updateWeek`,
        {
          weekname: weekName,
          assignment: assignment,
          lectureNotes: lecture,
          videoLecture: recordingLinks,
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
      <div className="mt-24 lg:mt-16">
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update the Week
            </h2>
            <form>
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Week Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setWeekName(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    placeholder="Week 1"
                  />
                </div>
                <div class="w-full">
                  <label
                    for="brand"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add Video Recording Link
                  </label>
                  <input
                    type="text"
                    name="brand"
                    onChange={(e) => setRecording(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div class="w-full">
                  <label
                    for="price"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add Assignment Link
                  </label>
                  <input
                    type="text"
                    name="price"
                    onChange={(e) => setAssignment(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div class="w-full">
                  <label
                    for="price"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add Lecture Notes Link
                  </label>
                  <input
                    type="text"
                    name="price"
                    onChange={(e) => setLecture(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button>
                  <button type="submit" onClick={handleSubmit}>
                    Update Week
                  </button>
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpdateWeek;
