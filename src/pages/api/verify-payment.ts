// pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ status: 'error', message: 'Missing payment reference' });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("Verifying reference:", reference);

    const data = await response.json();

    if (data.data.status === 'success') {
      return res.status(200).json({ status: 'success', data: data.data });
    } else {
      return res.status(400).json({ status: 'failed', message: 'Payment verification failed' });
    }
  } catch (error: any) {
    console.error('Verification error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}
