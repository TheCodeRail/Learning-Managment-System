import React, { useState, useEffect } from "react";
import AdminNavbar from "@/webcomponents/AdminNavbar";
import UserNavbar from "@/webcomponents/UserNavbar";
import Loading from "@/webcomponents/Loading";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { message } from "antd";
const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  async function getUser() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getUser`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(res.data.user);
      setUsername(res.data.user.username);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(username, gender, number, link, description, age);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/update`,
        {
          username: username,
          gender: gender,
          description: description,
          age: age,
          link: link,
          number: number,
          userId: user._id,
        }
      );
      message.success(res.data.msg);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {user.isAdmin ? (
            <>
              <AdminNavbar />
            </>
          ) : (
            <>
              <UserNavbar />
            </>
          )}
          <div className="mt-16">
            <section class="bg-white dark:bg-gray-900">
              <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Update Your Profile
                </h2>
                <form action="#">
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div class="w-full">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div class="w-full">
                      <label
                        for="brand"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <div class="w-full">
                      <label
                        for="brand"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Age
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="21"
                      />
                    </div>

                    <div>
                      <label
                        for="item-weight"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        id="item-weight"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Include +91"
                      />
                    </div>
                    <div>
                      <label
                        for="item-weight"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Github Link
                      </label>
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="john@github.com"
                      />
                    </div>
                    <div>
                      <label
                        for="item-weight"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Gender
                      </label>
                      <select
                        onChange={(e) => setGender(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                    <div class="sm:col-span-2">
                      <label
                        for="description"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Short Bio About Yourself"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>
                      <button onClick={handleSubmit}>Update</button>
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
