"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BottomBar from "@/components/bottom-bar/page";
import { useRouter } from "next/navigation";

// Main component for Fuel Purchases Page
export default function FuelPurchasesPage() {
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
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (confirmDelete) {
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
    });
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="container mx-auto px-6 h-full max-h-screen bg-[#EAEDFF]">
        <div className="h-auto p-2 relative">
          <div className="fixed h-auto top-0 left-0 w-full pt-10 px-6 z-50 bg-[#EAEDFF]">
            <div className="flex items-center rounded-lg pb-4">
              <div className="flex-shrink-0 bg-black p-6 rounded-lg"></div>
              <div className="ml-4">
                {user ? (
                  <form action={signOut} className="block items-center gap-2">
                    <p className="font-medium">Gusher</p>
                    <p className="text-gray-500 font-light text-sm">
                      {user.email}
                    </p>
                  </form>
                ) : (
                  <Button asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-[#3a54ff] p-2 rounded-xl w-full border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
              <div className="font-semibold text-md text-[#97a5ff]">
                My Balance
              </div>
              <div className="text-4xl py-4 flex text-white">
                <span className="text-sm flex justify-start pr-2 text-white">
                  Rp
                </span>
                {totalExpenses.toLocaleString("id-ID")}
              </div>
              <div className="flex justify-start items-center">
                <div className="bg-[#6478FF] text-red-500 p-2 flex text-center items-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
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
                <div className="pl-2 text-[#97a5ff]">last expenses</div>
              </div>
              <div className="text-white">
                {lastTransaction
                  ? lastTransaction.amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : (0).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
              </div>
            </div>
            <label className="block text-black font-semibold pb-1 mt-4">
              Last transaction
            </label>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="w-full mt-[90%] pb-[0%]">
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
                            router.push(`/update-transaction?id=${purchase.id}`)
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
        <BottomBar />
      </div>
    </div>
  );
}
