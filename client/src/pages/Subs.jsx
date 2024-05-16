import React, { useEffect, useState } from "react";
import UserNavbar from "@/webcomponents/UserNavbar";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { message } from "antd";

const Subs = () => {
  const [subscriptionType, setSubscriptionType] = useState(
    "monthly-subscription"
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [user, setUser] = useState({});
  let templateParams = {
    user_name: `${user.username}`,
    user_email: `${user.email}`,
    sub_type: `${subscriptionType}`,
  };
  async function sendMail() {
    const res = await emailjs.send(
      "service_gwdsh3a",
      "template_45uomwi",
      templateParams,
      {
        publicKey: "g26TyPCasQpQkMntW",
      }
    );
    if (res.status) {
      message.success("Request Sent Successfully");
    }
  }
  async function getUser() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getUser`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(res.data.user);
      setIsSubscribed(res.data.user.isSubscribed);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  async function handleSendRequest(e) {
    e.preventDefault();
    setSubscriptionType(subscriptionType);

    sendMail();
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="flex justify-center mt-32">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Subscription</TabsTrigger>
            <TabsTrigger value="password">Change Subscription</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
                <CardDescription>
                  {isSubscribed ? (
                    <>You are on Monthly Subscription</>
                  ) : (
                    <>You Are Not Subscribed to the Course</>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Want to Change Subscription?</CardTitle>
                <CardDescription>
                  Request for your Change Subscription Status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <RadioGroup
                  defaultValue="monthly-subscription"
                  onChange={(e) => setSubscriptionType(e.target.value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly-subscription" />
                    <Label htmlFor="monthly-subscription">
                      Monthly Subscription
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lifetime-subscription" />
                    <Label htmlFor="lifetime-subscription">
                      LifeTime Subscription
                    </Label>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" />
                    <Label htmlFor="option-two">Cancel Subscription</Label>
                  </div> */}
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <button onClick={handleSendRequest}>
                  <Button>Request Now</Button>
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Subs;
