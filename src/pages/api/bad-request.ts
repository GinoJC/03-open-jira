// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(400).json({
    ok: false,
    message: 'Algo salió mal',
  });
}
