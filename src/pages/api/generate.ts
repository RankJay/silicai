import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Leap } from "@leap-ai/sdk";
import { supabaseStore } from "@/store";

const leap = new Leap(process.env.LEAP_API_KEY as string);
leap.useModel(process.env.LEAP_AI_MODEL_ID as string);

type ResponseData = {
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { prompt, user } = req.body;
  const { data, error } = await leap.generate.generateImage({
    prompt,
    width: 1024,
    height: 1024,
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
    const response: {
      data:
        | WithImplicitCoercion<string>
        | { [Symbol.toPrimitive](hint: "string"): string };
    } = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const imageData = Buffer.from(response.data, "binary");
    const image = `data:image/png;base64,${imageData.toString("base64")}`;

    const userFromSupabase = await supabaseStore.from('user').select('email').eq('email', user.emailAddresses[0].emailAddress)

    console.log(userFromSupabase);

    const resp = await supabaseStore.from('inventory').insert({
      email: user.emailAddresses[0].emailAddress,
      image
    });

    if (resp.status === 201) {
      console.log("added.")
    }

    res.status(200).json({ image });
    return;
  }
  return;
}