"use client";
import React, { useState, useEffect } from "react";
import Paginate from "react-paginate";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ClientOnly from "../components/ClientOnly";

interface LogEntry {
  UID: string;
  timestamp: string;
  description: string;
  status: string;
  userName?: string;
  team?: string;
}

const HistoryTable: React.FC = () => {
  const [data, setData] = useState<LogEntry[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: "#my-table" });
    doc.save("data.pdf");
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const interval = setInterval(() => {
      fetch("https://iotclubbackend.gurkirat7092.repl.co/api/getEntryLogs")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredData = data.filter(
    (entry) =>
      search === "" ||
      entry.userName?.toLowerCase().includes(search.toLowerCase()) ||
      entry.team?.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <ClientOnly>
      <div className="bg-gray-900 text-white flex flex-col overflow-x-auto p-4">
        {isLoading ? (
          <div>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Search by name or team"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 mb-4 rounded bg-gray-800 text-white"
            />
            <button
              onClick={exportToPDF}
              className="mb-2 bg-blue-500 p-2 rounded text-white hover:bg-blue-400"
            >
              Export to PDF
            </button>
            <table id="my-table" className="table table-zebra rounded-2xl">
              <thead className="bg-gray-800 font-bold">
                <tr>
                  <th className=" text-left">UID</th>
                  <th className=" text-left">Timestamp</th>
                  <th className=" text-left">Description</th>
                  <th className=" text-left">Status</th>
                  <th className=" text-left">User Name</th>
                  <th className=" text-left">User Team</th>
                </tr>
              </thead>
              <tbody>
                {currentData.reverse().map((entry, index) => (
                  <tr
                    key={index}
                    className=" transition ease-in-out duration-300"
                  >
                    <td className="">{entry.UID}</td>
                    <td className="">
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                    <td className="">{entry.description}</td>
                    <td className="">{entry.status}</td>
                    <td className="">{entry.userName || "N/A"}</td>
                    <td className="">{entry.team || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
            <Paginate
              previousLabel={
                <span className="px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-400">
                  Previous Page
                </span>
              }
              nextLabel={
                <span className="px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-400">
                  Next Page
                </span>
              }
              breakLabel={<span className="px-2 py-1">...</span>}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={
                "pagination flex justify-center p-2 m space-x-2"
              }
              pageClassName={
                "px-2 py-1 bg-gray-700 rounded-lg transition duration-300 hover:bg-gray-600 cursor-pointer"
              }
              activeClassName={"bg-blue-500 text-white"}
              breakClassName="break-me px-2 py-1"
              initialPage={0}
              disableInitialCallback={true}
            />
          </div>
        )}
      </div>
    </ClientOnly>
  );
};

export default HistoryTable;
