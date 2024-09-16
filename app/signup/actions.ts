"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
  };

  if (!data.username) {
    redirect("/signup?message=Username is required");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username, // Send the username to Supabase
      },
    },
  });

  if (error) {
    redirect("/signup?message=Error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();

  revalidatePath("/"); // Revalidate cache pada path tertentu setelah signout
  redirect("/login"); // Mengarahkan ke halaman login setelah signout
}
