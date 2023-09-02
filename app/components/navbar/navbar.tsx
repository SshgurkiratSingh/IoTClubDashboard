"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NavTeamButton from "./NavTeamButton";
const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 lg:solid">
        {/* Display heading for large screens only */}
        <div className=" flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl animText">
            ISTC IoT Club
          </Link>
        </div>
        <div className="m-1">
          {/* <Link href="/">
            <div className="flex-none m-2 hidden lg:block">
              <button className="btn  ">Team Page</button>
            </div>
          </Link>
          <Link href="/">
            <div className="flex-none m-2 hidden lg:block">
              <button className="btn  ">Customisation Page</button>
            </div>
          </Link> */}
          <div className="flex flex-col justify-center items-center ">
            <details className="dropdown mb-2">
              <summary className="m-1 btn">Select Team</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                {Array.from({ length: 10 }, (_, i) => (
                  <NavTeamButton key={i} teamId={i + 1} />
                ))}
              </ul>
            </details>
          </div>{" "}
          <Link href="/">
            <div className="flex-none m-2 hidden lg:block">
              <button className="btn  ">Customisation Page</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
