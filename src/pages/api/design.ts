import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseStore } from "@/store";
type ResponseData = {
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.body;

  const { data, error } = await supabaseStore
    .from("inventory")
    .select("image")
    .eq("id", id);

  if (error || !data) {
    console.error("Error fetching data:", error);
  }
  
  res.status(200).json({ image: '' });
  return;
}
