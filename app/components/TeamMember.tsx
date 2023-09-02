"use client";
interface TeamMemberProps {
  teamId: Number;
}
type Team = {
  "Team ID": string;
  "Member 1": string;
  "Member 2": string;
  "Member 3": string;
  "Member 4": string;
  "Member 5": string;
  "Member 6": string;
};

import API_BASE_URL from "@/APIconfig";
import axios from "axios";
import { useEffect, useState } from "react";
const TeamMember: React.FC<TeamMemberProps> = ({ teamId }) => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Team>();
  const [error, setError] = useState(null);
  useEffect(() => {
    // Define the URL of the API you want to fetch data from
    const apiUrl = `${API_BASE_URL}/api/teamMember/${teamId}`; // Replace with your API URL

    // Use the fetch function to make the API request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMembers(data); // Update the state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false
      });
  }, []);
  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col border-2 rounded-lg m-1 p-1">
      <div>{members?.["Member 1"]}</div>
      <div>{members?.["Member 2"]}</div>
      <div>{members?.["Member 3"]}</div>
      <div>{members?.["Member 4"]}</div>
      <div>{members?.["Member 5"]}</div>
      <div>{members?.["Member 6"]}</div>
    </div>
  );
};
export default TeamMember;
