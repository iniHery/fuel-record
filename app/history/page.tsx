"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import BottomBar from "@/components/bottom-bar/page";
import { useRouter } from "next/navigation";
import {
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfWeek,
  endOfMonth,
  endOfYear,
} from "date-fns";

export default function FuelPurchasesPage() {
  const [fuelPurchases, setFuelPurchases] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  const [user, setUser] = useState<any>(null); // State untuk menyimpan data user
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();
  const [supabase] = useState(createClient());
  const [filter, setFilter] = useState<string>("week"); // Default filter: minggu

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

          // Perubahan: Ambil data dengan filter rentang waktu (minggu/bulan/tahun)
          const { startDate, endDate } = getStartAndEndDates(); // Perubahan

          // Fetch fuel purchases untuk user yang sedang login dan sesuai dengan filter waktu
          const { data: fuelData, error: fuelError } = await supabase
            .from("fuel_purchases")
            .select()
            .eq("user_id", userId) // Filter berdasarkan user_id
            .gte("date", startDate.toISOString()) // Filter berdasarkan tanggal mulai
            .lte("date", endDate.toISOString()); // Filter berdasarkan tanggal akhir

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
  }, [supabase, filter]);

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

  const getStartAndEndDates = () => {
    const today = new Date();
    let startDate, endDate;

    switch (filter) {
      case "january":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 0, 31);
        break;
      case "february":
        startDate = new Date(today.getFullYear(), 1, 1);
        endDate = new Date(today.getFullYear(), 1, 28);
        break;
      case "march":
        startDate = new Date(today.getFullYear(), 2, 1);
        endDate = new Date(today.getFullYear(), 2, 31);
        break;
      case "april":
        startDate = new Date(today.getFullYear(), 3, 1);
        endDate = new Date(today.getFullYear(), 3, 30);
        break;
      case "may":
        startDate = new Date(today.getFullYear(), 4, 1);
        endDate = new Date(today.getFullYear(), 4, 31);
        break;
      case "june":
        startDate = new Date(today.getFullYear(), 5, 1);
        endDate = new Date(today.getFullYear(), 5, 30);
        break;
      case "july":
        startDate = new Date(today.getFullYear(), 6, 1);
        endDate = new Date(today.getFullYear(), 6, 31);
        break;
      case "august":
        startDate = new Date(today.getFullYear(), 7, 1);
        endDate = new Date(today.getFullYear(), 7, 31);
        break;
      case "september":
        startDate = new Date(today.getFullYear(), 8, 1);
        endDate = new Date(today.getFullYear(), 8, 30);
        break;
      case "october":
        startDate = new Date(today.getFullYear(), 9, 1);
        endDate = new Date(today.getFullYear(), 9, 31);
        break;
      case "november":
        startDate = new Date(today.getFullYear(), 10, 1);
        endDate = new Date(today.getFullYear(), 10, 30);
        break;
      case "december":
        startDate = new Date(today.getFullYear(), 11, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        startDate = startOfWeek(today);
        endDate = endOfWeek(today);
        break;
    }

    return { startDate, endDate };
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="container mx-auto p-6 h-full bg-[#EAEDFF]">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/dashboard">
              <button className="bg-white p-2 rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </Link>
            <div className="flex items-center justify-center w-full h-ful">
              <h1 className="text-xl text-center text-black font-light size-xs">
                Add Transaction
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
                    fillRule="evenodd"
                    d="M10 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-9 8c0-.204.22-.809 1.32-1.459C4.838 10.44 6.32 10 8 10s3.162.44 4.18 1.041c1.1.65 1.32 1.255 1.32 1.459a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1m5.5-4c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-8 border-b border-gray-400">
            <div className="flex justify-start gap-4 pt-4 pb-8 overflow-x-scroll no-scrollbar">
              <button
                onClick={() => setFilter("january")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "january"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Januari
              </button>
              <button
                onClick={() => setFilter("february")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "february"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Februari
              </button>
              <button
                onClick={() => setFilter("march")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "march"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Maret
              </button>
              <button
                onClick={() => setFilter("april")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "april"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                April
              </button>
              <button
                onClick={() => setFilter("may")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "may"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Mei
              </button>
              <button
                onClick={() => setFilter("june")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "june"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Juni
              </button>
              <button
                onClick={() => setFilter("july")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "july"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Juli
              </button>
              <button
                onClick={() => setFilter("august")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "august"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Agustus
              </button>
              <button
                onClick={() => setFilter("september")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "september"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                September
              </button>
              <button
                onClick={() => setFilter("october")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "october"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Oktober
              </button>
              <button
                onClick={() => setFilter("november")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "november"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                November
              </button>
              <button
                onClick={() => setFilter("december")}
                className={`flex flex-cols-2 gap-2 p-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                  filter === "december"
                    ? "bg-[#2945FF] text-white"
                    : "bg-white text-black"
                } rounded-xl`}
              >
                Desember
              </button>
            </div>
          </div>

          <div className="w-full mt-6">
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
                        {new Date(purchase.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
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
