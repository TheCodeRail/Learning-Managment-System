import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EmailVerified = () => {
  const id = useParams("id");
  const navigate = useNavigate();
  const ID = id.id;
  async function verifyEmail() {
    try {
      if (!ID) {
        return message.error("Wrong Route");
      }
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/verify/${ID}`
      );
      message.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <>
      <section class="bg-white dark:bg-gray-900 mt-32">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Email is Verified!!
            </p>
            <Button>
              <Link to="/signIn">Go To Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailVerified;
