// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')('sk_test_51MyTmmJr18hT8NbDiaNCmPPlihcklbmIpDfCKdPWh7s8oWGfZrrVK4c3gBgE4S0q2Hh1wO5L2bAoIj5JZbcwUEAV00EkDGh7UH');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { item } = req.body;

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.image],
        name: item.name,
        description: item.description,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: req.headers.origin + '/new?status=success',
    cancel_url: req.headers.origin + '/new?status=cancel',
    metadata: {
      images: item.image,
    },
  });

  res.json({ id: session.id });
}
