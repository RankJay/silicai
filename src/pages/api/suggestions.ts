// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Suggestion {
  id: number;
  text: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Suggestion[] }>
) {
  setTimeout(() => {
    const resp: Suggestion[] = [
      { id: 1, text: "Texture" },
      { id: 2, text: "Color palette" },
      { id: 3, text: "Repeating patterns" },
      { id: 4, text: "Pattern scaling" },
      { id: 5, text: "Layering" },
      { id: 6, text: "Transparency" },
      { id: 7, text: "Gradient" },
      { id: 8, text: "Abstract shapes" },
      { id: 9, text: "Geometric shapes" },
      { id: 10, text: "Organic shapes" },
      { id: 11, text: "Line work" },
      { id: 12, text: "Optical illusions" },
      { id: 13, text: "Motion blur" },
      { id: 14, text: "Depth of field" },
      { id: 15, text: "Noise" },
      { id: 16, text: "Fractals" },
      { id: 17, text: "Symmetry" },
      { id: 18, text: "Asymmetry" },
      { id: 19, text: "Randomization" },
    ];
    res.status(200).json({ data: resp });
  }, 5000);
}
