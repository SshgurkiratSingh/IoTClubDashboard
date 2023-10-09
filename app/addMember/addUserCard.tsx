"use client";
import API_BASE_URL from "@/APIconfig";
import React, { useState } from "react";

const AddUserCard: React.FC = () => {
  const [formData, setFormData] = useState({
    UID: "",
    userName: "",
    userDescription: "",
    userType: "",
    email: "",
    userAllowed: false,
    userTeam: "",
    userRollNo: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    let newErrors: string[] = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors.push(`${key} field is required.`);
    });
    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      fetch(`${API_BASE_URL}/api/post/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setServerMessage(data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center transition-all ease-in-out duration-300 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 md:p-8 rounded-xl shadow-lg space-y-4 md:space-y-6 transition-all ease-in-out duration-300 transform hover:scale-105 w-full max-w-lg mx-4"
      >
        {serverMessage && (
          <div className="bg-green-500 p-2  mt-4 transition animate-pulse rounded-xl">
            {serverMessage}
          </div>
        )}
        {errors.length > 0 && (
          <div className="bg-red-500 p-2 rounded">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <h1 className="text-xl md:text-2xl font-bold text-center transition-all ease-in-out duration-300 transform hover:scale-105">
          Add User RFID
        </h1>
        <input
          type="text"
          name="UID"
          placeholder="UID"
          onChange={handleChange}
          className="input input-bordered w-full transition-all ease-in-out duration-300 hover:bg-gray-700 focus:ring-4 focus:ring-blue-500"
        />
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          onChange={handleChange}
          className="input input-bordered w-full transition-all ease-in-out duration-300 hover:bg-gray-700 focus:ring-4 focus:ring-blue-500"
        />
        <input
          type="text"
          name="userDescription"
          placeholder="User Desciption"
          onChange={handleChange}
          className="input input-bordered w-full transition-all ease-in-out duration-300 hover:bg-gray-700 focus:ring-4 focus:ring-blue-500"
        />
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="teacher"
              onChange={handleChange}
              className="radio radio-primary"
            />
            <span>Teacher</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="student"
              onChange={handleChange}
              className="radio radio-primary"
            />
            <span>Student</span>
          </label>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input input-bordered w-full transition-all ease-in-out duration-300 hover:bg-gray-700 focus:ring-4 focus:ring-blue-500"
        />
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="userAllowed"
              checked={formData.userAllowed}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary"
            />
            <span>User Allowed</span>
          </label>
        </div>
        <select
          name="userTeam"
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option disabled selected>
            User Team
          </option>{" "}
          <option value="Nispand">Nispand</option>
          <option value="Yashita">Yashita</option>
        </select>
        <input
          type="number"
          name="userRollNo"
          placeholder="User Roll No"
          maxLength={7}
          onChange={handleChange}
          className="input input-bordered w-full transition-all ease-in-out duration-300 hover:bg-gray-700 focus:ring-4 focus:ring-blue-500"
        />
        <div className="flex flex-col md:flex-col  md:space-x-4">
          <button
            type="submit"
            className="btn btn-primary w-full transition-all ease-in-out duration-300 transform hover:scale-105 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserCard;
