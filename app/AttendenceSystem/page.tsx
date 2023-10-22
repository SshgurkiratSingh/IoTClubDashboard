import Image from "next/image";
import Container from "../components/container";
import Link from "next/link";
import ClientOnly from "../components/ClientOnly";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between overflow-hidden bg-black">
      <Container>
        <ClientOnly>
          <div className="card w-full  bg-neutral text-neutral-content xl:max-w-4xl max-w-md">
            <div className="card-body items-center text-center ">
              <h2 className="card-title animText">
                Rfid Based Attendence System
              </h2>
              {/* <div className="overflow-hidden">
                <p>
                  User Validation Endpoint:
                  <div className="xl:mockup-browser-toolbar">
                    <code className="input border border-base-300 break-words">
                      iotclubbackend.gurkirat7092.repl.co
                    </code>
                    <br />
                    <code className="input border border-base-300 break-words">
                      /api/validateUser
                    </code>
                  </div>
                </p>
              </div> */}

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
                <Link
                  href="/viewMembers"
                  className="btn btn-primary w-full md:w-auto mb-2 md:mb-0"
                >
                  View All Members
                </Link>
                <Link
                  href="/attendanceTable"
                  className="btn btn-primary w-full md:w-auto mb-2 md:mb-0"
                >
                  View Attendance Table
                </Link>
              </div>
              {/* <p className="m-2s">
              <div className="mockup-code bg-black">
                <pre data-prefix="$">
                  <code>npm i daisyui</code>
                </pre>
                <pre data-prefix=">" className="text-warning">
                  <code>installing...</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                  <code>Done!</code>
                </pre>
              </div>
            </p> */}
            </div>
          </div>
        </ClientOnly>
      </Container>
    </main>
  );
}
