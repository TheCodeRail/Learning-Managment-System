import AdminNavbar from "@/webcomponents/AdminNavbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/webcomponents/Loading";
import UserNavbar from "@/webcomponents/UserNavbar";
import { Label } from "@/components/ui/label";

const ViewProfile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
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
      setLoading(false);
    } catch (error) {
      console.log(error);
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
          <section class="pt-16 bg-blueGray-50">
            <div class="w-full lg:w-4/12 px-4 mx-auto">
              <div class="relative flex flex-col min-w-0  bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div class="px-6">
                  <div class="text-center mt-12">
                    <h3 class="text-xl font-semibold leading-normal  text-blueGray-700">
                      {user.username}
                    </h3>
                    <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      {user.email}
                    </div>

                    <div class="mb-2 text-blueGray-600 ">
                      <Label>Bio : </Label>
                      {user.bio}
                    </div>
                    <div class="mb-2 text-blueGray-600 ">
                      <Label>Age : </Label>
                      {user.age}
                    </div>
                    <div class="mb-2 text-blueGray-600 ">
                      <Label>Gender : </Label>
                      {user.gender}
                    </div>
                    <div class="mb-2 text-blueGray-600">
                      <Label>Phone Number : </Label>
                      {user.PhoneNumber}
                    </div>
                    <div class="mb-2 text-blueGray-600">
                      <Label>Github Link : </Label>
                      <a className="cursor-pointer">{user.socialLinks}</a>
                    </div>
                    <div class="mb-2 text-blueGray-600">
                      <Label>Subscribed : </Label>
                      {user.isSubscribed ? <>Yes</> : <>No</>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ViewProfile;
