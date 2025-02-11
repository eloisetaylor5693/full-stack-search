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
    return mongoClient;
  }

  console.log('Creating new MongoClient...');
  mongoClient = new MongoClient(DATABASE_URL);
  console.log('Successfully created new MongoClient');

  return mongoClient;
}

async function GetConnectedClientInstance(): Promise<MongoClient | undefined> {
  let connectedClient: MongoClient = await GetMongoClient();

  try {
    await GetMongoClient();

    console.log('Connecting to MongoDB...');
    connectedClient = await mongoClient!.connect();
    console.log('Successfully connected to MongoDB!');

    return connectedClient;
  } catch (error) {
    console.error(error);

    throw new Error('Error connecting to MongoDB');
  }
}

export { GetConnectedClientInstance };
