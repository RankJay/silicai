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
  const resp: Suggestion[] = [
    { id: 1, text: "Abstract" },
    { id: 2, text: "Geometric" },
    { id: 3, text: "Floral" },
    { id: 4, text: "Art Nouveau" },
    { id: 5, text: "Paisley" },
    { id: 6, text: "Minimalist" },
    { id: 7, text: "Tribal" },
    { id: 8, text: "Ethnic" },
    { id: 9, text: "Art Nouveau" },
    { id: 10, text: "Minimalist" },
    { id: 11, text: "Pop Art" },
    { id: 12, text: "Op Art" },
    { id: 13, text: "Chinoiserie" },
    { id: 14, text: "Damask" },
    { id: 15, text: "Ikat" },
    { id: 16, text: "Toile" },
    { id: 17, text: "Plaid" },
    { id: 18, text: "Stripes" },
    { id: 19, text: "Polka dots" },
    { id: 20, text: "Gingham" },
    { id: 20, text: "Chevron" },
    { id: 20, text: "Herringbone" },
    { id: 20, text: "Foulard" },
    { id: 20, text: "Ogee" },
    { id: 20, text: "Trompe l'oeil" },
  ];
  res.status(200).json({ data: resp });
}
