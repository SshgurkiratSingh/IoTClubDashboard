"use client";
import React, { useState, useEffect } from "react";
import ClientOnly from "../components/ClientOnly";

interface User {
  UID: string;
  userName: string;
  userDescription: string;
  permissions: boolean;
  email: string;
  userRollNo: number | string;
  userType: string;
  userAllowed: boolean;
  userTeam?: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (uid: string) => {
    try {
      const response = await fetch(
        `https://iotclubbackend.gurkirat7092.repl.co/api/user/${uid}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the local state
      setUsers((users) => users?.filter((user) => user.UID !== uid) || null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://iotclubbackend.gurkirat7092.repl.co/api/getAllUser"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log the raw data
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <ClientOnly>
        <div className="flex flex-1 justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </ClientOnly>
    );
  }

  if (!users) {
    return <div>Error: Data is not formatted correctly</div>;
  }

  return (
    <div className="overflow-x-auto bg-slate-800">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>UID</th>
            <th>User Name</th>
            <th>User Description</th>
            <th>Permissions</th>
            <th>Email</th>
            <th>User Roll No</th>
            <th>User Type</th>
            <th>User Allowed</th>
            <th>User Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.UID}</td>
                <td>{user.userName}</td>
                <td>{user.userDescription}</td>
                <td>{user.permissions ? "Yes" : "No"}</td>
                <td>{user.email}</td>
                <td>{user.userRollNo}</td>
                <td>{user.userType}</td>
                <td>{user.userAllowed ? "Yes" : "No"}</td>
                <td>{user.userTeam || "N/A"}</td>{" "}
                <td>
                  <button
                    onClick={() => handleDelete(user.UID)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
