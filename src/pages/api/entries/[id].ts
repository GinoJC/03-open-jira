import { db } from 'database';
import { Entry, IEntry } from 'models';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IEntry;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: 'El id no es válido: ' + id });

  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return putEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint no válido' });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();
  if (entry) return res.status(200).json(entry);
  return res.status(400).json({ message: 'No se encontró la entrada' });
};

const putEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    db.disconnect();
    return res.status(404).json({ message: 'Entrada no encontrada' });
  }

  const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;
  try {
    const entry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { new: true, runValidators: true },
    );
    await db.disconnect();
    return res.status(200).json(entry!);
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: 'Error al actualizar la entrada' });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {};
