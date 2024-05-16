import React, { useState, useEffect } from "react";
import AdminNavbar from "@/webcomponents/AdminNavbar";
import axios from "axios";

const ShowAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  async function getAllUsers() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/api/getAllUsers?filter=${filter}`
      );

      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  //   async function handleDeleteUser(id) {
  //     console.log(id);
  //   }
  useEffect(() => {
    getAllUsers();
  }, [filter]);
  return (
    <>
      <AdminNavbar />

      <>
        <div className="mt-16">
          <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
              {/* <!-- Start coding here --> */}
              <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                      <label for="simple-search" class="sr-only">
                        Search
                      </label>
                      <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          onChange={(e) => setFilter(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search"
                          required=""
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-4 py-3">
                          User Name
                        </th>
                        <th scope="col" class="px-4 py-3">
                          User Email
                        </th>

                        <th scope="col" class="px-4 py-3">
                          Subscription
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Phone Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, key) => (
                        <>
                          <tr class="border-b dark:border-gray-700">
                            <th
                              scope="row"
                              class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {user.username}
                            </th>
                            <td class="px-4 py-3">{user.email}</td>
                            <td class="px-4 py-3">
                              {user.isSubscribed ? <>Yes</> : <>No</>}
                            </td>
                            <td class="px-4 py-3">{user.PhoneNumber}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
};

export default ShowAllUsers;
