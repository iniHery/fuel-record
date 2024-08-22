// import NextLogo from "./NextLogo";
// import SupabaseLogo from "./SupabaseLogo";

// export default function Header() {
//   return (
//     <div className="flex flex-col gap-16 items-center">
//       <div className="flex gap-8 justify-center items-center">
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <SupabaseLogo />
//         </a>
//         <span className="border-l rotate-45 h-6" />
//         <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
//           <NextLogo />
//         </a>
//       </div>
//       <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
//       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
//         The fastest way to build apps with{" "}
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Supabase
//         </a>{" "}
//         and{" "}
//         <a
//           href="https://nextjs.org/"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Next.js
//         </a>
//       </p>
//       <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
//     </div>
//   );
// }

import { signOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <form action={signOut} className="flex items-center gap-2">
              <p>{user.email}</p>
              <Button>Sign Out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
