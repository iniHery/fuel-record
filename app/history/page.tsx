"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BottomBar from "@/components/bottom-bar/page";

// Main component for Fuel Purchases Page
export default function History() {
  const [fuelPurchases, setFuelPurchases] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  const [user, setUser] = useState<any>(null); // State untuk menyimpan data user

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Menggunakan format 24 jam
    });
  };

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
                History
              </h1>
            </div>
          </div>
          <div className="w-full pt-4">
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
                        {formatDate(purchase.date)}
                        {/* {purchase.date} */}
                      </p>
                    </div>
                  </div>
                  <div className="w-full block">
                    <div className="w-full flex justify-end items-start">
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
      <BottomBar />
    </div>
  );
}
