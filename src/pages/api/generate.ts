import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import { Leap } from "@leap-ai/sdk";
import { randomUUID } from "crypto";

const leap = new Leap(process.env.LEAP_API_KEY as string);
leap.useModel(process.env.LEAP_AI_MODEL_ID as string);

type ResponseData = {
  image: string;
  id: string | null;
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
    res
      .status(200)
      .json({
        image: "Something went wrong while generating image!",
        id: null,
      });
    return;
  }
  if (data) {
    const imageUrl = data.images[0].uri;
    const imageId = randomUUID();
    let imageBase = '';
    const localFilePath = `./public/assets/${imageId}.png`;
    axios
      .get(imageUrl, { responseType: "arraybuffer" })
      .then(
        (response: {
          data:
            | WithImplicitCoercion<string>
            | { [Symbol.toPrimitive](hint: "string"): string };
        }) => {
          const imageData = Buffer.from(response.data, "binary");

          fs.writeFile(localFilePath, imageData, async (err) => {
            if (err) {
              console.error(`Error writing file: ${err}`);
            } else {
              console.log(`Image saved to ${localFilePath}`);
              const buffer = await fs.promises.readFile(localFilePath);
              const base64 = buffer.toString("base64");
              res.status(200).json({ image: `data:image/png;base64,${base64}`, id: imageId });
            }
          });
        }
      )
      .catch((error: any) => {
        console.error(`Error downloading image: ${error}`);
      });
    return;
  }
}
