import React, { useState } from "react";
import UserNavbar from "@/webcomponents/UserNavbar";
import { Button } from "@/components/ui/button";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Feedback = () => {
  const [content, setContent] = useState("select");
  const [communication, setCommunication] = useState("select");
  const [userExperience, setUserExperience] = useState("select");
  const [continueCourse, setContinueCourse] = useState("yes");
  const token = localStorage.getItem("token");
  const id = jwtDecode(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/feedback`,
        {
          content: content,
          communication: communication,
          userExperience: userExperience,
          continueCourse: continueCourse,
          userId: id._id,
        }
      );
      message.success(res.data.msg);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
  return (
    <>
      <UserNavbar />
      <div className="m-4">
        <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
          <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
            Feedback
          </h2>
          <p className="mb-5 leading-relaxed text-gray-600">
            We value your feedback! Please rate the following aspects
          </p>

          <div className="mb-4">
            <label className="text-sm leading-7 text-gray-600">
              Content Quality
            </label>
            <select
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="select"> Select</option>
              <option value="poor">1 - Poor</option>
              <option value="fair">2 - Fair</option>
              <option value="good">3 - Good</option>
              <option value="verygood">4 - Very Good</option>
              <option value="excellent">5 - Excellent</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm leading-7 text-gray-600">
              Communication
            </label>
            <select
              id="communication"
              name="communication"
              value={communication}
              onChange={(e) => setCommunication(e.target.value)}
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="select">Select</option>
              <option value="poor">1 - Poor</option>
              <option value="fair">2 - Fair</option>
              <option value="good">3 - Good</option>
              <option value="verygood">4 - Very Good</option>
              <option value="excellent">5 - Excellent</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm leading-7 text-gray-600">
              Website Experience
            </label>
            <select
              id="user_experience"
              name="user_experience"
              value={userExperience}
              onChange={(e) => setUserExperience(e.target.value)}
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="select">Select</option>
              <option value="poor">1 - Poor</option>
              <option value="fair">2 - Fair</option>
              <option value="good">3 - Good</option>
              <option value="verygood">4 - Very Good</option>
              <option value="excellent">5 - Excellent</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm leading-7 text-gray-600">
              Do you want to continue this course?
            </label>
            <p className="text-sm font-light m-4">
              Notice - By Choosing Yes, You will be getting a payment link on
              your email
            </p>
            <select
              id="continue_course"
              name="continue_course"
              value={continueCourse}
              onChange={(e) => setContinueCourse(e.target.value)}
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <Button>
            <button onClick={handleSubmit}>Submit</button>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Feedback;
