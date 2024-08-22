// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { SubmitButton } from "@/components/forms/submit-button";
// import { Input } from "@/components/forms/input";
// import { Label } from "@/components/forms/label";
// import { FormMessage, Message } from "@/components/forms/form-message";
// import { emailLogin } from "./actions";

// export default async function Login({
//   searchParams,
// }: {
//   searchParams: { message?: string };
// }) {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     return redirect("/signup");
//   }

//   return (
//     <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
//       <div className="w-full flex-1 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
//           <h1 className="text-2xl font-medium mb-4">Login</h1>
//           <p className="text-sm text-gray-600 mb-6">
//             Enter your email and password to log in to your account.
//           </p>
//           {/* {searchParams.message && <FormMessage message={searchParams} />} */}
//           <form className="flex flex-col gap-4" action={emailLogin}>
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//             <SubmitButton
//               formAction={emailLogin}
//               pendingText="Logging in..."
//               className="w-full"
//             >
//               Login
//             </SubmitButton>
//           </form>
//           <div className="text-center text-sm mt-4">
//             Don&apos;t have an account?{" "}
//             <Link
//               href="/signup"
//               className="text-blue-600 font-medium underline"
//             >
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/forms/input";
import { Label } from "@/components/forms/label";
import { FormMessage, Message } from "@/components/forms/form-message";
import { emailLogin } from "./actions";

export default async function Login({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link> */}

      <div className="w-full flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-medium mb-4">Login</h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your email and password to log in to your account.
          </p>
          {/* {searchParams.message && (
            <FormMessage message={searchParams} />
          )} */}
          <form className="flex flex-col gap-4" action={emailLogin}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <SubmitButton
              formAction={emailLogin}
              pendingText="Logging in..."
              className="w-full"
            >
              Login
            </SubmitButton>
          </form>
          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
