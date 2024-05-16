import React, { useState, useEffect } from "react";
import WeekCard from "./WeekCard";
import axios from "axios";
import Loading from "./Loading";

const AdminDashboard = () => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getAllWeeks() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getAllWeeks`
      );
      setWeeks(res.data.weeks);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllWeeks();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 p-4 lg:p-14">
            {weeks.map((wk, key) => (
              <>
                <WeekCard week={wk} key={wk._id} />
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
