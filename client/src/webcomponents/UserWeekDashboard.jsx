import React, { useEffect, useState } from "react";
import WeekCard from "./WeekCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const UserWeekDashboard = () => {
  const [weeks, setWeeks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  async function getAllWeeks() {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_ENDPOINT
        }/user/getAllWeeks?filter=${searchQuery}`
      );
      setWeeks(res.data.weeks);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllWeeks();
  }, [searchQuery]);
  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="relative mt-16 w-80">
          <input
            type="text"
            placeholder="Search weeks/projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 border rounded w-full"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 p-4 lg:p-14">
          {weeks.map((wk, key) => (
            <>
              <WeekCard week={wk} key={wk._id} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserWeekDashboard;
