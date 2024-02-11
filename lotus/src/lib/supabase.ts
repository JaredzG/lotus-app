import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.SB_URL,
  import.meta.env.SB_ANON_KEY
);
