import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt, clerk_id } = req.body;

    const respo = await axios.post(
      "https://silicai-server-0sdj.zeet-silicai.zeet.app/api/user/generate",
      {
        clerk_id,
        prompt,
      }
    );
    console.log(respo);
  } catch (err) {
    console.log(err);
  }
}
