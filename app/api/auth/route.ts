import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    // Mengambil data dari body request
    const { email, password, nama } = await request.json();

    // Memvalidasi input
    if (!email || !password || !nama) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, or nama" },
        { status: 400 }
      );
    }

    // Menyimpan data pengguna ke tabel `user_id`
    const { data, error } = await supabase
      .from("user_id")
      .insert([{ email, password, nama }]);

    if (error) {
      throw error; // Melempar error agar bisa ditangani di catch block
    }

    return NextResponse.json({ data }, { status: 201 }); // Status 201 untuk resource yang berhasil dibuat
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
