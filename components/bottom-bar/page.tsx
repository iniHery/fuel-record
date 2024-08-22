"use client";

import Link from "next/link";

export default function BottomBar() {
  return (
    <>
      <div className="h-auto max-w-sm">
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white">
          <div className="grid h-full max-w-md grid-cols-4 items-center mx-auto font-regular text-xs">
            <Link href="/dashboard">
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:text-[#2945FF] group text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1"
                  />
                </svg>
                <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Home
                </span>
              </button>
            </Link>
            <Link href="/add-transaction">
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:text-[#2945FF] group text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h7m7 0h-7m0 0V5m0 7v7"
                  />
                </svg>

                <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Add
                </span>
              </button>
            </Link>
            <Link href="/history">
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:text-[#2945FF] group text-black"
              >
                <svg
                  className="w-5 h-5 mb-2 text-black group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                  />
                </svg>
                <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  History
                </span>
              </button>
            </Link>

            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:text-[#2945FF] group text-black"
            >
              <svg
                className="w-5 h-5 mb-2 text-black group-hover:text-blue-600 dark:group-hover:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Profile
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
