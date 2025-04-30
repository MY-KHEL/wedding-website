// import * as functions from 'firebase-functions';
// import axios from 'axios';
// import cors from 'cors';

// const corsHandler = cors({ origin: true });

// export const verifyPayment = functions.https.onRequest((req, res) => {
//   corsHandler(req, res, async () => {
//     if (req.method !== 'POST') {
//       return res.status(405).send({ status: 'error', message: 'Method Not Allowed' });
//     }

//     const { reference } = req.body;

//     if (!reference) {
//       return res.status(400).send({ status: 'error', message: 'No reference provided' });
//     }

//     try {
//       const secretKey = functions.config().paystack.secret_key;

//       const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
//         headers: {
//           Authorization: `Bearer ${secretKey}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const { status, data } = response.data;

//       if (status && data.status === 'success') {
//         return res.send({ status: 'success', data });
//       } else {
//         return res.status(400).send({ status: 'error', message: 'Payment not successful' });
//       }
//     } catch (error: any) {
//       console.error(error.response?.data || error.message);
//       return res.status(500).send({ status: 'error', message: 'Internal server error' });
//     }
//   });
// });
