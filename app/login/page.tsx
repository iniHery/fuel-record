import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/forms/input";
import { Label } from "@/components/forms/label";

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

  interface FormMessageProps {
    message?: string;
  }

  const FormMessage: React.FC<FormMessageProps> = ({ message }) => {
    if (!message) return null;
    return <p className="text-red-600 mb-4">{message}</p>;
  };

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2">
      <div className="w-full flex-1 flex items-center justify-center ">
        <div className="w-full max-w-md rounded-lg p-6">
          <h1 className="text-2xl font-medium mb-4">Sign In</h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your email and password to log in to your account.
          </p>
          <FormMessage message={searchParams?.message ?? ""} />
          <form className="flex flex-col gap-4" action={emailLogin}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
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
                className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
              />
            </div>
            <SubmitButton
              formAction={emailLogin}
              pendingText="Logging in..."
              className="w-full"
            >
              Sign In
            </SubmitButton>
          </form>
          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?
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
