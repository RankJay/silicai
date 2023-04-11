import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Leap } from "@leap-ai/sdk";

const leap = new Leap(process.env.LEAP_API_KEY as string);
leap.useModel(process.env.LEAP_AI_MODEL_ID as string);

type ResponseData = {
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { prompt } = req.body;
  const { data, error } = await leap.generate.generateImage({
    prompt,
  });
  if (error) {
    console.log(error);
    res.status(200).json({
      image: "Something went wrong while generating image!",
    });
    return;
  }
  if (data) {
    const imageUrl = data.images[0].uri;
    axios
      .get(imageUrl, { responseType: "arraybuffer" })
      .then(
        (response: {
          data:
            | WithImplicitCoercion<string>
            | { [Symbol.toPrimitive](hint: "string"): string };
        }) => {
          const imageData = Buffer.from(response.data, "binary");

          const base64 = imageData.toString("base64");
          res.status(200).json({ image: `data:image/png;base64,${base64}` });
          return;
        }
      )
    return;
  }
}
