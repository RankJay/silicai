import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});
const model = process.env.REPLICATE_AI_MODEL! as `${string}/${string}:${string}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, email } = req.body;
  const output: any = await replicate.run(model, {
    input: {
      prompt,
    },
  });

  axios.post("https://silicai-server-52dq.zeet-silicai.zeet.app/api/user/save", {
    email,
    url: await output[0],
    prompt
  })

  res.json({ image: await output[0] });
}
