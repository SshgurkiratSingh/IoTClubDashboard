import Image from "next/image";
import Container from "../components/container";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-4 md:p-24">
      <Container>
        <div className="card w-full md:w-96 bg-neutral text-neutral-content gap-5 m-5">
          <div className="card-body items-center text-center ">
            <h2 className="card-title animText">
              Rfid Based Attendence System
            </h2>
            <p>What you wanna do</p>
            <div className="flex flex-col md:flex-row justify-evenly gap-4 ">
              <Link href="/addMember">
                <button className="btn btn-primary w-full md:w-auto mb-2 md:mb-0">
                  Add Member
                </button>
              </Link>{" "}
              <Link
                href="/viewLog"
                className="btn btn-primary w-full md:w-auto mb-2 md:mb-0"
              >
                
                  View Attendance Record
              
              </Link>
              <button className="btn btn-primary w-full md:w-auto">
                View All Members
              </button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
