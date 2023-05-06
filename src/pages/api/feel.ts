import axios from "axios";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { image_id, clerk_id, isLike } = JSON.parse(req.body);

  axios.post(
    "https://silicai-server-0sdj.zeet-silicai.zeet.app/api/user/feel",
    {
      clerk_id,
      image_id,
      isLike
    }
  );
  return res.status(200).json();
}
