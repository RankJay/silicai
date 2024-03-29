import axios from "axios";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { prompt, clerk_id, modelType } = req.body;

  return axios.post(
    "https://silicai-server-0sdj.zeet-silicai.zeet.app/api/user/generate",
    {
      clerk_id,
      prompt,
      modelType,
    }
  ).then((resp)=> {
    return res.status(200).json({ image: resp.data.image });
  }).catch((err) => {
    if(err.response.status === 500) {
      return res.status(400).json({ error: "Unfortunately, we are at the system capacity. We are working on scaling our systems. Try again or please check back soon!" });
    }
    console.log(err.response.data.message);
    return res.status(400).json({ error: err.response.data.message });
  });
}
