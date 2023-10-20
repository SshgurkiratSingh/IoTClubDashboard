"use client";
import { useRouter, useSearchParams } from "next/navigation";
interface NavTeamButtProps {
  teamId: Number;
  teamName?: String;
}
const NavTeamButton = ({ teamId, teamName }: NavTeamButtProps) => {
  const router = useRouter();
  return (
    <li
      onClick={() => router.push(`/team/${teamId}`)}
      className={`
        flex 
        flex-col 
        items-center 
        group
        justify-center 
        gap-1
        
        border-b-2
        hover:text-green-600
        transition
        cursor-pointer
       
      `}
    >
      <div className="font-medium text-sm">Team {String(teamId)}</div>
    </li>
  );
};
export default NavTeamButton;
