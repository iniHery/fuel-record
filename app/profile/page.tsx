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
              <h1 className="text-2xl text-center text-black font-light size-xs">
                Profile
              </h1>
            </div>
          </div>

          <div>
            <div className="block items-center rounded-lg py-6">
              <div className="flex-shrink-0 bg-white h-[30vh] p-6 w-full rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"></div>

              <div className="">
                {user ? (
                  <form
                    action={signOut}
                    className="block justify-start items-center "
                  >
                    <div className="w-full p-4 my-6 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                      <p>{user.email}</p>
                    </div>

                    <div className="w-full p-2 text-white bg-red-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                      <Button>Sign Out</Button>
                    </div>
                  </form>
                ) : (
                  <Button asChild>
                    <Link href="/login" className="flex justify-start">
                      Sign In
                    </Link>
                  </Button>
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
