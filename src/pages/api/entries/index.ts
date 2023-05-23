import { db } from 'database';
import { Entry, IEntry } from 'models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntry(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint no válido' });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'asc' });
  await db.disconnect();
  return res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ message: 'La descripción es requerida' });

  try {
    await db.connect();
    const entry = await Entry.create({ description, createdAt: Date.now() });
    await db.disconnect();
    return res.status(201).json(entry);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la entrada' });
  }
};
