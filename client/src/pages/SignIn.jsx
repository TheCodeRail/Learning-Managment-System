import Navbar from "@/webcomponents/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "@/webcomponents/Loading";
import { UserContext } from "@/context/UserContext";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email || !password) {
        setLoading(false);
        return message.error("Please Fill All Feilds");
      }
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/signIn`,
        {
          email: email,
          password: password,
        }
      );
      updateUser(res.data.user);
      message.success(`Welcome ${res.data.user.username}`);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.msg);
    }
  }

  // login with sign in button
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const res2 = await axios.post(
          `${import.meta.env.VITE_APP_ENDPOINT}/user/googleSignIn`,
          {
            email: res.data.email,
            profilePic: res.data.picture,
          }
        );

        updateUser(res2.data.updatedUser);
        message.success(`Welcome ${res2.data.updatedUser.username}`);
        localStorage.setItem("token", res2.data.token);
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setLoading(false);
        message.error(error.response.data.msg);
      }
    },
  });
  // login with one tab
  // useGoogleOneTapLogin({
  //   onSuccess: (credentialResponse) => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log("Login Failed");
  //   },
  // });

  return (
    <>
      <Navbar />
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <section class="bg-gray-50 dark:bg-gray-900 mt-12">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <div class="flex items-center justify-between">
                      <Link to="/forgot">Forgot password?</Link>
                    </div>
                    <div className="flex justify-start w-full">
                      <Button>
                        <button
                          type="submit"
                          className="w-56 md:w-80"
                          onClick={handleSubmit}
                        >
                          Sign in
                        </button>
                      </Button>
                    </div>

                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <Link
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        to="/signUp"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                  <div className="flex items-center justify-center my-4">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="border-t border-gray-300 flex-grow"></div>
                  </div>
                  <button
                    onClick={() => login()}
                    className="flex items-center justify-center w-full py-2 border border-white rounded-lg text-white bg-black hover:bg-gray-700"
                  >
                    <FcGoogle className="mr-2" size={20} />
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SignIn;
