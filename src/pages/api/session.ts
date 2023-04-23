// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { item } = req.body;

  const checkoutSession = await axios.post(
    "https://silicai-server-52dq.zeet-silicai.zeet.app/api/stripe/session",
    {
      ...item,
    }
  );

  res.json({ ... await checkoutSession.data });
}
