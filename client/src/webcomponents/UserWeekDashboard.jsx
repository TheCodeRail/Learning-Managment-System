import React, { useEffect, useState } from "react";
import WeekCard from "./WeekCard";
import axios from "axios";
const UserWeekDashboard = () => {
  const [weeks, setWeeks] = useState([]);
  async function getAllWeeks() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getAllWeeks`
      );
      setWeeks(res.data.weeks);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllWeeks();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 p-4 lg:p-14">
        {weeks.map((wk, key) => (
          <>
            <WeekCard week={wk} key={wk._id} />
          </>
        ))}
      </div>
    </>
  );
};

export default UserWeekDashboard;
