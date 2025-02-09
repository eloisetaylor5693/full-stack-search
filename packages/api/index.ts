import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/hotels', async (req, res) => {
  const freetextSearchValue = req?.query?.['freetext-search'] as string;

  const mongoClient = new MongoClient(DATABASE_URL);
  console.log('Connecting to MongoDB...');

  try {
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB!');
    const db = mongoClient.db();

    const query = {
      $or: [
        { chain_name: { $regex: freetextSearchValue, $options: 'i' } },
        { hotel_name: { $regex: freetextSearchValue, $options: 'i' } },
        { country: { $regex: freetextSearchValue, $options: 'i' } },
        { city: { $regex: freetextSearchValue, $options: 'i' } },
      ],
    };

    const collection = db.collection('hotels').find(query);
    res.send(await collection.toArray());
  } finally {
    await mongoClient.close();
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
