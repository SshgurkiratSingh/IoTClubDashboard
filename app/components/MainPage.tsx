"use client";
interface TeamData {
  id: string;
  projectTitle: string;
  teamId: number;
  sensor1Name: string;
  sensor1Value: string;
  sensor2Name: string | null;
  sensor2Value: string | null;
  date: string;
  remarks: string | null;
}

interface Sensor {
  teamData: TeamData | null;
  maxValue: number[];
}

interface SensorData {
  sensor1: Sensor;
  sensor2: Sensor;
  sensor3: Sensor;
  sensor4: Sensor;
}

import { formatDistanceToNow } from "date-fns";
import API_BASE_URL from "@/APIconfig";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});
const axios = require("axios");
const MainPageBox = () => {
  const [data, setData] = useState<SensorData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/getDashboardData`
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 6000);

    fetchData();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
        <div className="bg-blue-600/20 p-4 flex flex-col rounded-lg shadow-md">
          {data?.sensor1?.teamData ? (
            <div className="flex flex-col justify-center items-center">
              <div>Team {data.sensor1.teamData.teamId}</div>
              <GaugeComponent
                type="semicircle"
                minValue={0}
                maxValue={data.sensor1.maxValue[0]}
                value={parseInt(data.sensor1.teamData.sensor1Value, 10)}
                arc={{
                  cornerRadius: 7,
                  padding: 0.05,
                  width: 0.25,
                  gradient: false,
                  subArcs: [
                    { limit: 0, color: "#FF0000" },
                    { limit: data.sensor1.maxValue[0] * 0.3, color: "#00FF00" },
                    { limit: data.sensor1.maxValue[0] * 0.6, color: "#FFFFAA" },
                    { limit: data.sensor1.maxValue[0] * 0.9, color: "#FFFF00" },
                    { limit: data.sensor1.maxValue[0], color: "#FF0000" },
                  ],
                }}
              />{" "}
              <div>{data.sensor1.teamData.sensor1Name}</div>
            </div>
          ) : null}
        </div>
        <div className="bg-blue-600/20 p-4 flex flex-col rounded-lg shadow-md">
          {data?.sensor2?.teamData ? (
            <div className="flex flex-col justify-center items-center">
              <div>Team {data.sensor2.teamData.teamId}</div>
              <GaugeComponent
                type="semicircle"
                minValue={0}
                maxValue={data.sensor2.maxValue[0]}
                value={parseInt(data.sensor2.teamData.sensor1Value, 10)}
                pointer={{
                  type: "needle",
                  color: "#ff0000", // Color of the pointer
                  baseColor: "#000000", // Base color of the pointer
                  length: 0.8, // Length of the pointer
                  animate: true, // Enable pointer animation
                }}
                arc={{
                  cornerRadius: 7,
                  padding: 0.05,
                  width: 0.25,
                  gradient: false,
                  subArcs: [
                    { limit: 0, color: "#FF0000" },
                    { limit: data.sensor2.maxValue[0] * 0.3, color: "#00FF00" },
                    { limit: data.sensor2.maxValue[0] * 0.6, color: "#FFFFAA" },
                    { limit: data.sensor2.maxValue[0] * 0.9, color: "#FFFF00" },
                    { limit: data.sensor2.maxValue[0], color: "#FF0000" },
                  ],
                }}
              />
              <div>{data.sensor2.teamData.sensor1Name}</div>
            </div>
          ) : null}
        </div>
        <div className="bg-blue-600/20 p-4 flex flex-col rounded-lg shadow-md">
          {data?.sensor3?.teamData ? (
            <div className="flex flex-col justify-center items-center">
              <div>Team {data.sensor3.teamData.teamId}</div>
              <GaugeComponent
                type="semicircle"
                minValue={0}
                maxValue={data.sensor3.maxValue[0]}
                value={parseInt(data.sensor3.teamData.sensor1Value, 10)}
                pointer={{
                  type: "needle",
                  color: "#ff0000", // Color of the pointer
                  baseColor: "#000000", // Base color of the pointer
                  length: 0.8, // Length of the pointer
                  animate: true, // Enable pointer animation
                }}
                arc={{
                  cornerRadius: 7,
                  padding: 0.05,
                  width: 0.25,
                  gradient: false,
                  subArcs: [
                    { limit: 0, color: "#FF0000" },
                    { limit: data.sensor3.maxValue[0] * 0.3, color: "#00FF00" },
                    { limit: data.sensor3.maxValue[0] * 0.6, color: "#FFFFAA" },
                    { limit: data.sensor3.maxValue[0] * 0.9, color: "#FFFF00" },
                    { limit: data.sensor3.maxValue[0], color: "#FF0000" },
                  ],
                }}
              />
              <div>{data.sensor3.teamData.sensor1Name}</div>
            </div>
          ) : null}
        </div>
        <div className="bg-blue-600/20 p-4 flex flex-col rounded-lg shadow-md">
          {data?.sensor4?.teamData ? (
            <div className="flex flex-col justify-center items-center">
              <div>Team {data.sensor4.teamData.teamId}</div>
              <GaugeComponent
                type="semicircle"
                minValue={0}
                maxValue={data.sensor4.maxValue[0]}
                value={parseInt(data.sensor4.teamData.sensor1Value, 10)}
                pointer={{
                  type: "needle",
                  color: "#ff0000", // Color of the pointer
                  baseColor: "#000000", // Base color of the pointer
                  length: 0.8, // Length of the pointer
                  animate: true, // Enable pointer animation
                }}
                arc={{
                  cornerRadius: 7,
                  padding: 0.05,
                  width: 0.25,
                  gradient: false,
                  subArcs: [
                    { limit: 0, color: "#FF0000" },
                    { limit: data.sensor4.maxValue[0] * 0.4, color: "#00FF00" },
                    { limit: data.sensor4.maxValue[0] * 0.6, color: "#FFFFAA" },
                    { limit: data.sensor4.maxValue[0] * 0.9, color: "#FFFF00" },
                    { limit: data.sensor4.maxValue[0], color: "#FF0000" },
                  ],
                }}
              />
              <div>{data.sensor4.teamData.sensor1Name}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default MainPageBox;
