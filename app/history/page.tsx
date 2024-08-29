"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import BottomBar from "@/components/bottom-bar/page";
import { useRouter } from "next/navigation";

// Main component for Fuel Purchases Page
export default function History() {
  const [fuelPurchases, setFuelPurchases] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  const [user, setUser] = useState<any>(null); // State untuk menyimpan data user

  const router = useRouter();

  // Initialize Supabase client and fetch data inside useEffect
  useEffect(() => {
    const supabase = createClient();

    const getData = async () => {
      // Mengambil data pembelian bahan bakar
      const { data, error } = await supabase.from("fuel_purchases").select();
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setFuelPurchases(data || []);
        calculateTotalExpenses(data || []);
        setLastTransaction(data?.[0] || null);
      }

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

  // Function to calculate total expenses
  const calculateTotalExpenses = (data: any[]) => {
    const total = data.reduce((acc, purchase) => acc + purchase.amount, 0);
    setTotalExpenses(total);
  };

  // Handle delete operation
  const handleDelete = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("fuel_purchases")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error deleting data:", error);
    } else {
      const updatedPurchases = fuelPurchases.filter(
        (purchase) => purchase.id !== id
      );
      setFuelPurchases(updatedPurchases);
      calculateTotalExpenses(updatedPurchases);
      setLastTransaction(updatedPurchases[0] || null);
    }
  };

  return (
    <div className="h-screen w-full bg-[#EAEDFF]">
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
                History
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

          <div className="container mx-auto">
            <div className="w-full mt-10">
              {fuelPurchases.map((purchase) => (
                <div key={purchase.id} className="w-full flex-rows py-2 ">
                  <div className="flex flex-cols-2 gap-2 p-2 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                    <div className="bg-black text-red-500 p-4 flex text-center items-center rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m12 5 6 6m-6-6-6 6m6-6v14"
                        />
                      </svg>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex-col">
                        <p className="text-[10px] text-gray-400">
                          {purchase.liters} Liter
                        </p>
                        <p className="font-medium uppercase">
                          {purchase.category}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {purchase.date}
                        </p>
                      </div>
                    </div>
                    <div className="w-full block">
                      <div className="w-full flex justify-end items-start">
                        <div>
                          {/* Mengirim ID transaksi ke halaman edit */}
                          <button
                            type="button"
                            onClick={() =>
                              router.push(
                                `/update-transaction?id=${purchase.id}`
                              )
                            }
                            className="text-blue-500 mr-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.2"
                              >
                                <path d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z" />
                                <path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3" />
                              </g>
                            </svg>
                          </button>
                        </div>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(purchase.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 12 6 6m6 6 6 6m-6-6 6-6m-6 6-6 6"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="w-full flex justify-end items-end">
                        <p className="font-bold mt-3">
                          {purchase.amount.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
