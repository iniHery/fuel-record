"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BottomBar from "@/components/bottom-bar/page";

export default function Ptofile() {
  const [user, setUser] = useState<any>(null); // State untuk menyimpan data user

  useEffect(() => {
    const supabase = createClient();

    const getData = async () => {
      // Mengambil data user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
      } else {
        setUser(userData?.user || null);
      }
    };

    getData();
  }, []);
  return (
    <div className="h-screen w-full max-w-sm bg-[#EAEDFF]">
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
              <h1 className="text-xl text-center text-black font-light size-xs">
                Profile
              </h1>
            </div>
            <div>
              <div className="bg-white p-2 rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M10 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-9 8c0-.204.22-.809 1.32-1.459C4.838 10.44 6.32 10 8 10s3.162.44 4.18 1.041c1.1.65 1.32 1.255 1.32 1.459a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1m5.5-4c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div className="block items-center rounded-lg py-6">
              <div className="flex-shrink-0 bg-white h-[30vh] flex justify-center items-center w-full rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M10 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-9 8c0-.204.22-.809 1.32-1.459C4.838 10.44 6.32 10 8 10s3.162.44 4.18 1.041c1.1.65 1.32 1.255 1.32 1.459a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1m5.5-4c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              {/* <div className="">
                {user ? (
                  <form
                    action={signOut}
                    className="block justify-start items-center "
                  >
                    <div className="w-full p-4 my-6 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                      <p>{user.email}</p>
                    </div>

                    <div
                      typeof="submit"
                      className="w-full p-2 text-white bg-red-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
                    >
                      <Button>Sign Out</Button>
                    </div>
                  </form>
                ) : (
                  <Link href="/login" className="flex justify-start">
                    <Button asChild>Sign In</Button>
                  </Link>
                )}
              </div> */}

              <div className="">
                {user ? (
                  <form
                    action={signOut}
                    className="block justify-start items-center"
                  >
                    <div className="w-full p-4 my-6 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                      <p>{user.email}</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full p-4 text-white bg-red-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
                    >
                      Sign Out
                    </button>
                  </form>
                ) : (
                  <Link href="/login" className="flex justify-start w-full">
                    <button className="w-full p-2 text-white bg-blue-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
