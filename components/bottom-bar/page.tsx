"use client";

import Link from "next/link";

export default function BottomBar() {
  return (
    <>
      <div className="max-w-sm">
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white">
          <div className="grid h-full max-w-md grid-cols-4 items-center mx-auto font-regular text-xs">
            <Link
              href="/dashboard"
              className="flex justify-center items-center"
            >
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-4 hover:text-[#2945FF] group text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12.5 12.618c.307-.275.5-.674.5-1.118V6.977a1.5 1.5 0 0 0-.585-1.189l-3.5-2.692a1.5 1.5 0 0 0-1.83 0l-3.5 2.692A1.5 1.5 0 0 0 3 6.978V11.5A1.496 1.496 0 0 0 4.493 13H5V9.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2V13h.507c.381-.002.73-.146.993-.382m2-1.118a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V6.977A3 3 0 0 1 2.67 4.6l3.5-2.692a3 3 0 0 1 3.66 0l3.5 2.692a3 3 0 0 1 1.17 2.378zm-5-2A.5.5 0 0 0 9 9H7a.5.5 0 0 0-.5.5V13h3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Home
                </span>
              </button>
            </Link>
            <Link
              href="/add-transaction"
              className="flex justify-center items-center"
            >
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-4 hover:text-[#2945FF] group text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M8 1.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5H8.75v4.75a.75.75 0 0 1-1.5 0V8.75H2.5a.75.75 0 0 1 0-1.5h4.75V2.5A.75.75 0 0 1 8 1.75"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Add
                </span>
              </button>
            </Link>
            <Link href="/history" className="flex justify-center items-center">
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-4 hover:text-[#2945FF] group text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M1.75 14a.75.75 0 0 1 0-1.5h12.5a.75.75 0 0 1 0 1.5zM5.5 9.5H4a.5.5 0 0 1-.5-.5V3.5A.5.5 0 0 1 4 3h1.5a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5M4 11a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2h1.5a2 2 0 0 1 2 2V9a2 2 0 0 1-2 2zm8-1.5h-1.5A.5.5 0 0 1 10 9V7a.5.5 0 0 1 .5-.5H12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5M10.5 11a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2H12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  History
                </span>
              </button>
            </Link>
            <Link href="/profile" className="flex justify-center items-center">
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center px-4 hover:text-[#2945FF] group text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M10 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-9 8c0-.204.22-.809 1.32-1.459C4.838 10.44 6.32 10 8 10s3.162.44 4.18 1.041c1.1.65 1.32 1.255 1.32 1.459a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1m5.5-4c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs text-black group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Profile
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
