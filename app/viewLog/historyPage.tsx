"use client";
import React, { useState, useEffect } from "react";

interface LogEntry {
  UID: string;
  timestamp: string;
  description: string;
  status: string;
  userName?: string;
  userTeam?: string;
}

const HistoryTable: React.FC = () => {
  const [data, setData] = useState<LogEntry[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://iotclubbackend.gurkirat7092.repl.co/api/getEntryLogs")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="  text-white flex items-center justify-center overflow-x-auto">
      <table className="table table-zebra">
        <thead className="bg-gray-800 ">
          <tr>
            <th className="p-4 text-left">UID</th>
            <th className="p-4 text-left">Timestamp</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">User Name</th>
            <th className="p-4 text-left">User Team</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className=" transition ease-in-out duration-300">
              <td className="p-4">{entry.UID}</td>
              <td className="p-4">
                {new Date(entry.timestamp).toLocaleString()}
              </td>
              <td className="p-4">{entry.description}</td>
              <td className="p-4">{entry.status}</td>
              <td className="p-4">{entry.userName || "N/A"}</td>
              <td className="p-4">{entry.userTeam || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
