import React, { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { message } from "antd";

const WeekCard = ({ week }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [completionStatus, setCompletionStatus] = useState([]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const token = localStorage.getItem("token");
  const Id = jwtDecode(token);
  const userId = Id._id;
  async function handleSaveProgress() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/complete`,
        {
          userId: userId,
          weekId: week._id,
          completed: isChecked,
        }
      );
      message.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const filteredCompletion = week.completionStatus.find(
      (status) => status.userId === userId
    );
    if (filteredCompletion) {
      setIsChecked(filteredCompletion.completed);
    }
    setCompletionStatus(week.completionStatus);
  }, [week.completionStatus]);
  return (
    <>
      <Card className="w-[380px] lg:mt-8 mt-28">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>{week.weekname}</div>
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 border checked:border-black"
              />
              {/* <Checkbox className="ml-3" /> */}
            </div>
          </CardTitle>
          <CardDescription>
            All Your Week's Tasks Are Mentioned Here
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer">
            {/* <BellRing /> */}
            <Dialog>
              {" "}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  <DialogTrigger>Lectur Slides Link</DialogTrigger>
                </p>
              </div>
              <DialogContent>
                <DialogHeader>
                  {week.lectureNotes.map((lec) => (
                    <>
                      <DialogTitle>
                        <a href={lec} target="_blank">
                          <Button>{lec}</Button>
                        </a>
                      </DialogTitle>
                    </>
                  ))}
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* <Switch /> */}
          </div>
          <div className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer">
            {/* <BellRing /> */}
            <Dialog>
              {" "}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  <DialogTrigger>Video Recording</DialogTrigger>
                </p>
              </div>
              <DialogContent>
                <DialogHeader>
                  {week.videoLecture.map((lec) => (
                    <>
                      <DialogTitle>
                        <a href={lec} target="_blank">
                          <Button>{lec}</Button>
                        </a>
                      </DialogTitle>
                    </>
                  ))}
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* <Switch /> */}
          </div>
          <div className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer">
            {/* <BellRing /> */}
            <Dialog>
              {" "}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  <DialogTrigger>Assignments Links</DialogTrigger>
                </p>
              </div>
              <DialogContent>
                <DialogHeader>
                  {week.assignment.map((lec) => (
                    <>
                      <DialogTitle>
                        <a href={lec} target="_blank">
                          <Button>{lec}</Button>
                        </a>
                      </DialogTitle>
                    </>
                  ))}
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* <Switch /> */}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <button onClick={handleSaveProgress}>Save Your Progress</button>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default WeekCard;
