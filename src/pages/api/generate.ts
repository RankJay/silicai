import axios from "axios";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { prompt, clerk_id } = req.body;

  axios.post(
    "https://silicai-server-0sdj.zeet-silicai.zeet.app/api/user/generate",
    {
      clerk_id,
      prompt,
    }
  ).then((resp)=> {
    return res.status(200).json({ image: resp.data.image.image });
  }).catch((err) => {
    console.log(err.response.data.message);
    return res.status(400).json({ error: err.response.data.message });
  });
}
