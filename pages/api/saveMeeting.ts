import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  try {
    await client.connect();
    const db = client.db('onboarding');
    const collection = db.collection('meetings');
    const result = await collection.insertOne(req.body);

    res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
