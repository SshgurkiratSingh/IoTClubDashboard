import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/Empty";
import SensorFDashboardForTeam from "./sensorDashBoardForTeam";
import TeamMember from "@/app/components/TeamMember";

interface IParams {
  teamId: string;
}
const teamDashBoard = async ({ params }: { params: IParams }) => {
  if (!params) return <EmptyState />;

  return (
    <div className="flex flex-col justify-center items-center w-full  ">
      <ClientOnly>
        <div className="m-1 flex flex-col  items-center ">

          <div className="flex flex-col ">
            <div className="flex flex-col m-2  transition items-center overflow-hidden">
              <div className="animText  m-1">Team {params.teamId} </div>
              <div className=" flex flex-col justify-center items-center ">
                <TeamMember teamId={parseInt(params.teamId)} />
              </div>
            </div>
            <SensorFDashboardForTeam teamId={params.teamId} />
          </div>
        </div>
      </ClientOnly>
    </div>
  );
};
export default teamDashBoard;
export const dynamic = "force-dynamic";
