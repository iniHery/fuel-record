import { createClient } from "@supabase/supabase-js";

// Gantilah dengan URL dan Anon Key Anda dari Supabase
const supabaseUrl =
  process.env.SUPABASE_URL || "https://vtctfkperojgdgvtufjt.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Y3Rma3Blcm9qZ2RndnR1Zmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzMDQyNzMsImV4cCI6MjAzOTg4MDI3M30.pS4MD6xJcmK12f1FSqEuP09mbwak6me2sJ37YJeil2g";

// Membuat instance Supabase Client
export const supabase = createClient(supabaseUrl, supabaseKey);
