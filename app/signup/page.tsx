import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Link from "next/link";
import { SubmitButton } from "../../components/forms/submit-button";
import { Input } from "@/components/forms/input";
import { Label } from "@/components/forms/label";
import { FormMessage, Message } from "@/components/forms/form-message";
import { encodedRedirect } from "@/utils/utils";

export default async function Signup({
  searchParams,
}: {
  searchParams: Message;
}) {
  const signUp = async (formData: FormData) => {
    "use server";
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const username = formData.get("username")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");

    if (!email || !password || !username) {
      return { error: "Email, password, and username are required" };
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error.code + " " + error.message);
      return encodedRedirect("error", "/signup", "Error trying to sign up");
    } else {
      const userId = data.user?.id; // Get the user's ID

      // Insert the user profile into the profiles table
      if (userId) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId, // Use the user's ID
          user_name: username, // Save the username
        });

        if (profileError) {
          console.error("Error inserting profile: " + profileError.message);
          return encodedRedirect(
            "error",
            "/signup",
            "Error creating user profile"
          );
        }
      }

      // Clear form inputs after success
      formData.delete("email");
      formData.delete("password");
      formData.delete("username");

      return encodedRedirect(
        "success",
        "/login", // Redirect to login after signup
        "You have successfully created an account, please log in immediately"
      );
    }
  };

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-6">
      <Link
        href="/login"
        className="absolute left-[6%] top-6 p-2 flex justify-center items-center text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
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
      </Link>

      <form
        className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md"
        action={signUp}
      >
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground/60">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-600 pl-1 font-medium underline"
          >
            Sign In
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            placeholder="yourusername"
            required
            className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
          />

          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full p-4 text-black bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8),0_0px_0px_rgba(0,0,0,0.8)]"
          />
          <SubmitButton
            formAction={signUp}
            pendingText="Signing up..."
            className="mt-4"
          >
            Sign up
          </SubmitButton>
        </div>
        <div className="mt-2">
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
