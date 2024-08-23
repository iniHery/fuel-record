import BottomBar from "@/components/bottom-bar/page";
import Link from "next/link";

export default function Ptofile() {
  return (
    <div className="h-full w-full">
      <div className="container mx-auto p-6">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/dashboard">
              <button className="bg-white p-2 rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </Link>
            <div className="flex items-center justify-center w-full h-ful">
              <h1 className="text-2xl text-center text-black font-light size-xs">
                Profile
              </h1>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
