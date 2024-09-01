"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { NumericFormat } from "react-number-format";
import Link from "next/link";
import BottomBar from "@/components/bottom-bar/page";

export default function UpdateTransactionPage() {
  const [id, setId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [liters, setLiters] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const transactionId = searchParams.get("id");
    setId(transactionId);

    const supabase = createClient();

    const fetchData = async () => {
      if (transactionId) {
        const { data, error } = await supabase
          .from("fuel_purchases")
          .select()
          .eq("id", transactionId)
          .single();

        if (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again later.");
        } else if (data) {
          setAmount(data.amount.toString());
          setCategory(data.category);
          setLiters(data.liters.toString());
          setDate(data.date);
        }
      }
    };

    fetchData();
  }, [searchParams]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessAlert(false);

    if (!id) {
      setError("Invalid transaction ID.");
      return;
    }

    if (!amount || !category || !liters || !date) {
      setError("Please fill in all fields.");
      return;
    }

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("fuel_purchases")
        .update({
          amount: parseFloat(amount),
          category,
          liters: parseFloat(liters),
          date,
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating data:", error);
        setError("Failed to update transaction. Please try again.");
      } else {
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          router.push("/"); // Redirect to main page after success
        }, 3000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="container mx-auto p-6 h-full bg-[#EAEDFF]">
        <div className="">
          <div className="">
            <div className="flex items-center rounded-lg pb-4">
              <Link href="/dashboard">
                <button className="bg-white p-2 rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
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
              <div className="flex items-center justify-center w-full h-full">
                <h1 className="text-xl text-center text-black font-light">
                  Edit Transaction
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

            {error && (
              <div
                className="w-full p-4 mb-4 text-white bg-red-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] relative"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="mt-10">
              {successAlert && (
                <div
                  className="w-full p-4 mb-4 text-white bg-green-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] relative"
                  role="alert"
                >
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">
                    Your transaction has been updated.
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
                <label className="block text-black font-semibold pb-2">
                  Liters
                </label>
                <NumericFormat
                  value={liters}
                  onValueChange={(values) => {
                    const { value } = values;
                    setLiters(value);
                  }}
                  thousandSeparator={true}
                  decimalScale={2}
                  allowNegative={false}
                  placeholder="Input your liters..."
                  className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-black font-semibold pb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="flex justify-center mt-10 mb-20">
                <button
                  type="submit"
                  className="w-full bg-[#2945FF] text-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
