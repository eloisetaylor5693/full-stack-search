import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

let mongoClient: MongoClient | null = null;

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('../db/startAndSeedMemoryDB');
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}
const DATABASE_URL = process.env.DATABASE_URL;

async function GetMongoClient(): Promise<MongoClient> {
  if (!!mongoClient) {
    mongoClient.connect();
    return mongoClient;
  }

  mongoClient = new MongoClient(DATABASE_URL);
  console.log('Connecting to MongoDB...');

  await mongoClient.connect();
  console.log('Successfully connected to MongoDB!');

  return mongoClient;
}

export default GetMongoClient;
