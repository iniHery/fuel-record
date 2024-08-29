// "use client";

// import BottomBar from "@/components/bottom-bar/page";
// import { createClient } from "@/utils/supabase/client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { NumericFormat } from "react-number-format";

// export const dynamic = "force-dynamic";

// export default function UpdatePage() {
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [liters, setLiters] = useState("");
//   const [date, setDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [successAlert, setSuccessAlert] = useState(false);
//   const [error, setError] = useState("");

//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const supabase = createClient();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id) {
//         const { data, error } = await supabase
//           .from("fuel_purchases")
//           .select()
//           .eq("id", id)
//           .single();

//         if (error) {
//           console.error("Error fetching data:", error);
//           setError("Failed to fetch data. Please try again later.");
//         } else if (data) {
//           setAmount(data.amount);
//           setCategory(data.category);
//           setLiters(data.liters);
//           setDate(data.date);
//         }
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [id]);

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!amount || !category || !liters || !date) {
//       alert("Please fill in all fields before submitting.");
//       return;
//     }

//     try {
//       const { error } = await supabase
//         .from("fuel_purchases")
//         .update({ amount, category, liters, date })
//         .eq("id", id);

//       if (error) {
//         console.error("Error updating data:", error);
//         setError("Failed to update transaction. Please try again.");
//       } else {
//         setSuccessAlert(true);
//         setTimeout(() => setSuccessAlert(false), 3000);
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       setError("An unexpected error occurred. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-full w-full flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full max-w-sm bg-[#EAEDFF]">
//       <div className="container mx-auto p-6">
//         <div className="flex items-center">
//           <Link href="/dashboard">
//             <button className="bg-white p-2 rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-6 h-6 text-black"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>
//           </Link>
//           <div className="flex items-center justify-center w-full h-full">
//             <h1 className="text-xl text-center text-black font-light size-xs">
//               Edit Transaction
//             </h1>
//           </div>
//           <div>
//             <div className="bg-white p-2 rounded-[8px] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   fill="currentColor"
//                   fillRule="evenodd"
//                   d="M10 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-9 8c0-.204.22-.809 1.32-1.459C4.838 10.44 6.32 10 8 10s3.162.44 4.18 1.041c1.1.65 1.32 1.255 1.32 1.459a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1m5.5-4c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div
//             className="w-full p-4 mb-4 text-white bg-red-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] relative"
//             role="alert"
//           >
//             <strong className="font-bold">Error!</strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         <form onSubmit={handleUpdate} className="mt-10">
//           {successAlert && (
//             <div
//               className="w-full p-4 mb-4 text-white bg-green-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] relative"
//               role="alert"
//             >
//               <strong className="font-bold">Success!</strong>
//               <span className="block sm:inline">
//                 Your transaction has been updated.
//               </span>
//             </div>
//           )}
//           <div className="mb-4">
//             <label className="block text-black font-semibold pb-2">
//               Amount
//             </label>
//             <NumericFormat
//               value={amount}
//               onValueChange={(values) => {
//                 const { value } = values;
//                 setAmount(value);
//               }}
//               thousandSeparator={true}
//               decimalScale={2}
//               allowNegative={false}
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
//                   onClick={() => setCategory("pertamax")}
//                   className={`px-4 py-2 rounded-xl  border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                     category === "pertamax"
//                       ? "bg-blue-400 text-white"
//                       : "bg-white text-black"
//                   }`}
//                 >
//                   Pertamax
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setCategory("pertalite")}
//                   className={`px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                     category === "pertalite"
//                       ? "bg-blue-400 text-white"
//                       : "bg-white text-black"
//                   }`}
//                 >
//                   Pertalite
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setCategory("diesel")}
//                   className={`px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                     category === "diesel"
//                       ? "bg-blue-400 text-white"
//                       : "bg-white text-black"
//                   }`}
//                 >
//                   Diesel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setCategory("solar")}
//                   className={`px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
//                     category === "solar"
//                       ? "bg-blue-400 text-white"
//                       : "bg-white text-black"
//                   }`}
//                 >
//                   Solar
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block text-black font-semibold pb-2">
//               Liters
//             </label>
//             <NumericFormat
//               value={liters}
//               onValueChange={(values) => {
//                 const { value } = values;
//                 setLiters(value);
//               }}
//               thousandSeparator={true}
//               decimalScale={2}
//               allowNegative={false}
//               placeholder="Input your liters..."
//               className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-black font-semibold pb-2">
//               Date
//             </label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 text-white bg-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
//           >
//             Update Transaction
//           </button>
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
import { useSearchParams } from "next/navigation";
import { NumericFormat } from "react-number-format";

export const dynamic = "force-dynamic";

export default function UpdatePage() {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [liters, setLiters] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("fuel_purchases")
          .select()
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again later.");
        } else if (data) {
          setAmount(data.amount);
          setCategory(data.category);
          setLiters(data.liters);
          setDate(data.date);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id, supabase]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !liters || !date) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const { error } = await supabase
        .from("fuel_purchases")
        .update({ amount, category, liters, date })
        .eq("id", id);

      if (error) {
        console.error("Error updating data:", error);
        setError("Failed to update transaction. Please try again.");
      } else {
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 3000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
          <div className="flex items-center justify-center w-full h-full">
            <h1 className="text-xl text-center text-black font-light size-xs">
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
                      ? "bg-blue-400 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Pertamax
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("pertalite")}
                  className={`px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                    category === "pertalite"
                      ? "bg-blue-400 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Pertalite
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("solar")}
                  className={`px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                    category === "solar"
                      ? "bg-blue-400 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Solar
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("dex")}
                  className={`px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)] ${
                    category === "dex"
                      ? "bg-blue-400 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Dex
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
              decimalScale={2}
              allowNegative={false}
              placeholder="Input your liters..."
              className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold pb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="w-full p-4 text-white bg-blue-400 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      <BottomBar />
    </div>
  );
}
