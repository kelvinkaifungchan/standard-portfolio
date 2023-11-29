"use client";

import { HorizontalLine } from "@/components/HorizontalLine";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/name")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then((data) => {
        // Handle the data here
        setName(data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error during fetch:", error);
      });
  }, []);

  return (
    <>
      <main className="flex h-full w-full font-light overflow-y-hidden overflow-x-hidden">
        <div className="w-full h-full flex flex-col border-r border-[#FFFFFF55]">
          <div className="p-5 text-xl">{name}</div>
          <HorizontalLine />
        </div>
        <div className="flex flex-col w-full h-full justify-center min-w-[80vw]">
          <div className="w-full h-full p-2">
            <textarea
              className="bg-transparent p-2 rounded-md text-8xl w-full"
              placeholder="Enter Acess Code"
              onChange={(e) => {
                setCode(e.target.value);
              }}
              value={code}
            />
          </div>
          <div className="text-8xl p-2 ">
            {code.length > 0 ? (
              <Link
                className="hover:opacity-50 duration-150 flex items-center space-x-5"
                href={`/key/${code}`}>
                <span>Enter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.8}
                  stroke="currentColor"
                  className="w-24 h-24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            ) : (
              <div className="opacity-30 flex items-center space-x-5">
                <span>Enter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.8}
                  stroke="currentColor"
                  className="w-24 h-24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
