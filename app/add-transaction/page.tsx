"use client";

import BottomBar from "@/components/bottom-bar/page";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Page() {
  const [fuelPurchases, setFuelPurchases] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [liters, setLiters] = useState("");
  const [date, setDate] = useState("");
  const supabase = createClient();
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("fuel_purchases").select();
      setFuelPurchases(data || []);
    };
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("fuel_purchases")
      .insert([{ amount, category, liters, date }]);
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      setFuelPurchases([...fuelPurchases, ...(data || [])]);
      setAmount("");
      setCategory("");
      setLiters("");
      setDate("");
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(true), 3000);
    }
  };

  return (
    <div className="h-full w-full max-w-sm bg-[#EAEDFF]">
      <div className="container mx-auto p-6">
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
                  fill-rule="evenodd"
                  d="M10 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-9 8c0-.204.22-.809 1.32-1.459C4.838 10.44 6.32 10 8 10s3.162.44 4.18 1.041c1.1.65 1.32 1.255 1.32 1.459a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1m5.5-4c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10">
          {successAlert && (
            <div
              className="w-full p-4 mb-4 text-white bg-green-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                Your transaction has been added.
              </span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-black font-semibold pb-2">
              Amount
            </label>
            <NumericFormat
              value={amount}
              onValueChange={(values) => {
                const { value } = values;
                setAmount(value);
              }}
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              placeholder="Input your amount..."
              className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold pb-2">
              Category
            </label>
            <div className="flex-col">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setCategory("pertamax")}
                  className={`px-4 py-2 rounded-xl  border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                    category === "pertamax"
                      ? "bg-[#2945FF] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Pertamax
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("pertalite")}
                  className={`px-4 py-2 rounded-xl  border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                    category === "pertalite"
                      ? "bg-[#2945FF] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Pertalite
                </button>
              </div>

              <div className="flex mb-4 gap-4">
                <div className="basis-2/3">
                  <button
                    type="button"
                    onClick={() => setCategory("dexlite")}
                    className={`px-4 py-2 w-full rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                      category === "dexlite"
                        ? "bg-[#2945FF] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    Dexlite
                  </button>
                </div>
                <div className="w-full basis-1/3">
                  <div className="flex justify-end items-end">
                    <button
                      type="button"
                      onClick={() => setCategory("solar")}
                      className={`px-4 py-2 rounded-xl w-full border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                        category === "solar"
                          ? "bg-[#2945FF] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      Solar
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={() => setCategory("pertamax-turbo")}
                  className={`px-4 py-2 rounded-xl w-full border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                    category === "pertamax-turbo"
                      ? "bg-[#2945FF] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Pertamax Turbo
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold pb-1">Liter</label>
            <input
              type="number"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
              required
              placeholder="Input how many liters..."
              className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold pb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="my-32">
            <button
              type="submit"
              className="w-full p-4 text-white font-medium bg-[#2945FF] rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <BottomBar />
    </div>
  );
}
