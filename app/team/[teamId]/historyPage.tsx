"use client";
import API_BASE_URL from "@/APIconfig";
import axios from "axios";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import React, { ChangeEvent } from "react";

export type SensorData = {
  id: string;
  projectTitle: string;
  teamId: number;
  sensor1Name: string;
  sensor1Value: string;
  sensor2Name: string;
  sensor2Value: string;
  date: string;
  remarks: null | string;
};

export type ApiResponse = {
  data: SensorData[];
  totalPages: number;
};
interface HistoryPageProps {
  teamId: string;
}
const HistoryPage = ({ teamId }: HistoryPageProps) => {
  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [timeAlert, setTimeAlert] = useState(false);
  const [data, setData] = useState<ApiResponse>();
  const [disabled, setDisabled] = useState(true);
  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPerPage(parseInt(event.target.value));
  };
  useEffect(() => {
    /**
     * Fetches data from the API and updates the state variables.
     *
     * @return {Promise<void>} A Promise that resolves when the data is fetched and the state variables are updated.
     */
    const fetchData = async () => {
      setDisabled(true);
      const response = await fetch(
        `${API_BASE_URL}/api/getDashboardData/${teamId}?page=${current}&limit=${perPage}`
      );
      const jsonData = await response.json();
      setData(jsonData);
      setDisabled(false);
    };

    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const elapsedMinutes = Math.floor(elapsedTime / 60000);

      if (elapsedMinutes >= 1) {
        setTimeAlert(true);
      }
    }, 1000);

    fetchData();

    return () => {
      clearInterval(interval);
    };
  }, [current, perPage]);

  const goToPreviousPage = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const goToNextPage = () => {
    setCurrent(current + 1);
  };
  if (data) {
    return (
      <div>
        <div className="flex flex-col justify-center items-center">
          Team History
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="pagination">
            <span className="badge">{current}</span>
            <button
              className="btn"
              onClick={goToPreviousPage}
              disabled={current === 1 || disabled}
            >
              Previous
            </button>
            {data && (
              <>
                <button
                  className="btn"
                  onClick={goToNextPage}
                  disabled={current === data.totalPages || disabled}
                >
                  Next Page
                </button>
                <span className="badge">{data.totalPages}</span>
              </>
            )}{" "}
          </div>
          <div className="overflow-x-auto bg-slate-800/100 rounded-lg">
            <table className="table w-full table-zebra table-pin-rows">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Sensor 1 Name</th>
                  <th>Sensor 1 Value</th>
                  <th>Sensor 2 Name</th>
                  <th>Sensor 2 Value</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => (
                  <tr key={index} className="hover">
                    <td>{index + 1}</td>
                    <td>{item.sensor1Name}</td>
                    <td>{item.sensor1Value}</td>
                    <td>{item.sensor2Name}</td>
                    <td>{item.sensor2Value}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="dda">
              <input
                type="range"
                min="0"
                max="30"
                value={perPage}
                className="range"
                step="10"
                onChange={handleRangeChange}
                disabled={disabled}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div>Team History</div>

      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};
export default HistoryPage;
