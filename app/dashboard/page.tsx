"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BottomBar from "@/components/bottom-bar/page";
import { useRouter } from "next/navigation";

export default function FuelPurchasesPage() {
  const [fuelPurchases, setFuelPurchases] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  const [user, setUser] = useState<any>(null); // State untuk menyimpan data user
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();
  const [supabase] = useState(createClient());

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch user data
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;
        const user = userData?.user;
        setUser(user);

        if (user) {
          const userId = user.id;

          // Fetch fuel purchases for the current user
          const { data: fuelData, error: fuelError } = await supabase
            .from("fuel_purchases")
            .select()
            .eq("user_id", userId); // Filter by user_id
          if (fuelError) throw fuelError;

          setFuelPurchases(fuelData || []);
          calculateTotalExpenses(fuelData || []);
          setLastTransaction(fuelData?.[0] || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [supabase]);

  // Function to calculate total expenses
  const calculateTotalExpenses = (data: any[]) => {
    const total = data.reduce((acc, purchase) => acc + purchase.amount, 0);
    setTotalExpenses(total);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Handle delete operation
  const handleDelete = async () => {
    if (deleteId !== null && user) {
      const { error } = await supabase
        .from("fuel_purchases")
        .delete()
        .eq("id", deleteId)
        .eq("user_id", user.id); // Ensure deletion is user-specific
      if (error) {
        console.error("Error deleting data:", error);
      } else {
        const updatedPurchases = fuelPurchases.filter(
          (purchase) => purchase.id !== deleteId
        );
        setFuelPurchases(updatedPurchases);
        calculateTotalExpenses(updatedPurchases);
        setLastTransaction(updatedPurchases[0] || null);
      }
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="container mx-auto px-6 h-full bg-[#EAEDFF]">
        <div className="h-auto p-2 relative">
          <div className="fixed h-auto top-0 left-0 w-full pt-6 px-6 z-50 bg-[#EAEDFF]">
            <div className="flex items-center rounded-lg pb-6">
              <div>
                <div className="bg-white px-2 py-6  rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                  {/* <svg
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
                  </svg> */}
                </div>
              </div>
              <div className="ml-4">
                {user ? (
                  <form action={signOut} className="block items-center gap-2">
                    <p className="font-semibold">
                      Start from small things first
                    </p>
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.2"
                            >
                              <path d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z" />
                              <path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3" />
                            </g>
                          </svg>
                        </button>
                      </div>

                      <button
                        className="text-red-500"
                        onClick={() => confirmDelete(purchase.id)}
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
        <div className="mt-8 fixed bottom-0 w-full">
          <BottomBar />
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white p-6 m-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Delete Transaction</h2>
            <p className="mb-4">
              Are you sure you want to delete this transaction?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-black bg-gray-100 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
