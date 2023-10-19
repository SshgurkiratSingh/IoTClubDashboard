"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface EntryLog {
  UID: string;
  timestamp: string;
  description: string;
  status: string;
  userName: string;
  team: string;
}

export default function AttendanceTable() {
  const [data, setData] = useState<EntryLog[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<EntryLog[]>(
          "https://iotclubbackend.gurkirat7092.repl.co/api/getEntryLogs"
        );
        setData(response.data);
      } catch (error) {
        console.error("There was an issue fetching the data:", error);
      }
    }

    fetchData();
  }, []);

  // Extract all unique dates
  const uniqueDates = Array.from(
    new Set(
      data.map((item) => new Date(item.timestamp).toISOString().split("T")[0])
    )
  );

  // Group data by userName
  const groupedByUser: { [key: string]: EntryLog[] } = {};
  data.forEach((item) => {
    if (!groupedByUser[item.userName]) {
      groupedByUser[item.userName] = [];
    }
    groupedByUser[item.userName].push(item);
  });

  return (
    <div className=" text-white flex flex-col overflow-x-auto p-4">
      <table className="table  table-zebra rounded-2xl">
        <thead>
          <tr>
            <th>User Name</th>
            {uniqueDates.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedByUser).map((userName, index) => (
            <tr key={index}>
              <td>{userName}</td>
              {uniqueDates.map((uniqueDate) => (
                <td key={uniqueDate}>
                  {groupedByUser[userName].some(
                    (item) =>
                      new Date(item.timestamp).toISOString().split("T")[0] ===
                      uniqueDate
                  ) ? (
                    <span className="text-green-500">&#10004;</span>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
