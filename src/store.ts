import { createClient } from "@supabase/supabase-js";
import { proxy } from "valtio";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const store = proxy({
  imageURI: "/assets/try.png",
  isGenerating: false,
  loadingSpeed: 10,
});

export const supabaseStore = createClient(supabaseUrl, supabaseAnonKey);

export default store;
