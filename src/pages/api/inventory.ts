import axios from "axios";
import { Request, Response } from "express";

interface InventoryObjects {
  image_id: string;
  created_at: Date;
  prompt: string;
  clerk_id: string;
}

export default async function handler(req: Request, res: Response) {
  const { clerk_id } = req.body;

  return axios
    .post(
      `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/inventory/get`,
      { clerk_id }
    )
    .then((resp) => {
      return res.status(200).json({ image: resp.data });
    })
    .catch((err) => {
      if (err.response.status === 500) {
        return res.status(200).json({ image: null });
      }
      console.log(err.response.data.message);
      return res.status(200).json({ image: null });
    });
}
