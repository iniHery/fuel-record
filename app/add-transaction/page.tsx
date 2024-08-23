// "use client";

// import BottomBar from "@/components/bottom-bar/page";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/client";

// // const saveFuelPurchase = async (amount: number, category: string, liters: number, date: string) => {
// //   const { data, error } = await supabase
// //     .from('fuel_purchases')
// //     .insert([
// //       { amount, category, liters, date },
// //     ]);

// //   if (error) {
// //     console.error("Error inserting data:", error);
// //     return null;
// //   }

// //   return data;
// // };

// export default function Page() {
//   const [fuelPurchases, setFuelPurchases] = useState<any[]>([]);
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [liters, setLiters] = useState("");
//   const [date, setDate] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const numericAmount = parseFloat(amount);
//     const numericLiters = parseFloat(liters);

//     if (isNaN(numericAmount) || isNaN(numericLiters)) {
//       alert("Please enter valid numbers for amount and liters.");
//       return;
//     }

//     const result = await saveFuelPurchase(
//       numericAmount,
//       category,
//       numericLiters,
//       date
//     );

//     if (result) {
//       alert("Transaction saved successfully!");
//       setFuelPurchases([...fuelPurchases, result]);
//       setAmount("");
//       setCategory("");
//       setLiters("");
//       setDate("");
//     } else {
//       alert("Failed to save transaction. Please try again.");
//     }
//   };

//   return (
//     <div className="h-screen max-w-sm">
//       <div className="container mx-auto p-4">
//         <div className="flex items-center">
//           <Link href="/">
//             <button className="bg-white p-2 rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="2"
//                 stroke="currentColor"
//                 className="w-6 h-6 text-black"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>
//           </Link>
//           <div className="flex items-center justify-center w-full h-full">
//             <h1 className="text-2xl text-center text-black font-light size-xs">
//               Add Transaction
//             </h1>
//           </div>
//         </div>

//         <form className="mt-20" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-black font-semibold pb-1">
//               Amount
//             </label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//               placeholder="Input your amount..."
//               className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-black font-semibold pb-2">
//               Category
//             </label>
//             <div className="flex-col">
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <button
//                   type="button"
//                   onClick={() => setCategory("pertamax-turbo")}
//                   className={`px-4 py-2 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                     category === "pertamax-turbo"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   Pertamax Turbo
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setCategory("pertamina-dex")}
//                   className={`px-4 py-2 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                     category === "pertamina-dex"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   Pertamina Dex
//                 </button>
//               </div>

//               <div className="flex mb-4 gap-4">
//                 <div className="basis-2/3">
//                   <button
//                     type="button"
//                     onClick={() => setCategory("pertalite")}
//                     className={`px-4 py-2 w-full rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                       category === "pertalite"
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200 text-black"
//                     }`}
//                   >
//                     Pertalite
//                   </button>
//                 </div>
//                 <div className="w-full basis-1/3">
//                   <div className="flex justify-end items-end">
//                     <button
//                       type="button"
//                       onClick={() => setCategory("solar")}
//                       className={`px-4 py-2 rounded-xl w-full bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                         category === "solar"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 text-black"
//                       }`}
//                     >
//                       Solar
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block text-black font-semibold pb-1">Liter</label>
//             <input
//               type="number"
//               value={liters}
//               onChange={(e) => setLiters(e.target.value)}
//               required
//               placeholder="Input how many liters..."
//               className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-black font-semibold pb-1">Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
//             />
//           </div>

//           <div className="mt-32">
//             <button
//               type="submit"
//               className="w-full p-4 text-white font-medium bg-[#2945FF] rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//       <BottomBar />
//     </div>
//   );
// }

"use client";

import BottomBar from "@/components/bottom-bar/page";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [fuelPurchases, setFuelPurchases] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [liters, setLiters] = useState("");
  const [date, setDate] = useState("");
  const supabase = createClient();

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
            <h1 className="text-2xl text-center text-black font-light size-xs">
              Add Transaction
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="mb-4">
            <label className="block text-black font-semibold pb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
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
                    category === "pertamina-dex"
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
