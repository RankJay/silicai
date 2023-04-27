import axios from "axios";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { image_id } = req.body;

  return axios.post(
    "https://silicai-server-0sdj.zeet-silicai.zeet.app/api/user/inventory/get",
    { image_id }
  ).then((resp)=> {
    return res.status(200).json({ image: resp.data.image });
  }).catch((err) => {
    if(err.response.status === 500) {
      return res.status(400).json({ image: null });
    }
    console.log(err.response.data.message);
    return res.status(400).json({ image: null });
  });
}
