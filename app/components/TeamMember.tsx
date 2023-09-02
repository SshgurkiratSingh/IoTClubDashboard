"use client";
interface TeamMemberProps {
  teamId: Number;
}
import API_BASE_URL from "@/APIconfig";
import axios from "axios";
import { useEffect, useState } from "react";
const TeamMember: React.FC<TeamMemberProps> = ({ teamId }) => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }
};
export default TeamMember;
