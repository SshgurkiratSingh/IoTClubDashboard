"use client";
import axios from "axios";

interface TeamData {
  id: string;
  projectTitle: string;
  teamId: number;
  sensor1Name: string;
  sensor1Value: string;
  sensor2Name: string | null;
  sensor2Value: string | null;
  date: Date | null;
  remarks: string | null;
}

export interface ApiResponse {
  teamData: TeamData;
  maxValue: [number, number];
}
import { formatDistanceToNow } from "date-fns";
import API_BASE_URL from "@/APIconfig";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});
interface SensorFDashboardForTeamProps {
  teamId: string;
}
const SensorFDashboardForTeam = ({ teamId }: SensorFDashboardForTeamProps) => {
  const [guageData, setGuageData] = useState<ApiResponse>();
  const [subArcs, setSubArcs] = useState<any[]>([]);
  // const formattedDate = formatDistanceToNow(
  //   new Date(guageData?.teamData.date),
  //   {
  //     addSuffix: true,
  //   }
  // );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/getSensorDataByTeamid/${teamId}`
        );
        if (response.status === 200) {
          setGuageData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log(guageData);

    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col m-2  overflow-hidden">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold ">Sensor Dashboard</h1>
        {guageData?.teamData?.date ? (
          <div>
            Last updated{" "}
            {formatDistanceToNow(new Date(guageData.teamData.date))}
          </div>
        ) : null}
        <div className="flex flex-col lg:flex-row justify-center items-center ">
          {guageData?.teamData && (
            <div className="flex flex-col justify-center items-center ">
              <GaugeComponent
                type="radial"
                minValue={0}
                maxValue={guageData.maxValue[0]}
                value={parseInt(guageData.teamData.sensor1Value, 10)}
                arc={{
                  cornerRadius: 7,
                  padding: 0.05,
                  width: 0.25,
                  gradient: false,
                  subArcs: [
                    { limit: 0, color: "#FF0000" },
                    { limit: guageData.maxValue[0] * 0.3, color: "#00FF00" },
                    { limit: guageData.maxValue[0] * 0.6, color: "#FFFFAA" },
                    { limit: guageData.maxValue[0] * 0.9, color: "#FFFF00" },
                    { limit: guageData.maxValue[0], color: "#FF0000" },
                  ],
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0,
                }}
              />
              <p>{guageData.teamData.sensor1Name}</p>
            </div>
          )}
          {guageData?.teamData?.sensor2Name &&
          guageData?.teamData?.sensor2Value ? (
            <div className="flex flex-col justify-center items-center">
              <GaugeComponent
                type="radial"
                value={parseInt(guageData.teamData.sensor2Value, 10)}
                maxValue={guageData.maxValue[1]}
                arc={{
                  cornerRadius: 7,
                  padding: 0.05,
                  width: 0.25,
                  gradient: false,
                  subArcs: [
                    { limit: 0, color: "#FF0000" },
                    { limit: guageData.maxValue[1] * 0.3, color: "#00FF00" },
                    { limit: guageData.maxValue[1] * 0.6, color: "#FFFFAA" },
                    { limit: guageData.maxValue[1] * 0.9, color: "#FFFF00" },
                    { limit: guageData.maxValue[1], color: "#FF0000" },
                  ],
                }}
              />
              <p>{guageData.teamData.sensor2Name}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default SensorFDashboardForTeam;
