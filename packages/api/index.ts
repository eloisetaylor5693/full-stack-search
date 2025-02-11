import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ObjectId } from 'mongodb';
import { HotelSearchResponse } from 'interfaces/hotelSearchResponse';
import { Hotel } from 'interfaces/hotel';
import { City } from 'interfaces/city';
import { Country } from 'interfaces/country';
import GetMongoClient from 'utils/GetMongoDbClientSingleton';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/hotels', async (req, res) => {
  const freetextSearchValue = req?.query?.['freetext-search'] as string;
  const mongoClient = await GetMongoClient();

  try {
    const db = mongoClient.db();

    const hotelsQuery = {
      $or: [
        { chain_name: { $regex: freetextSearchValue, $options: 'i' } },
        { hotel_name: { $regex: freetextSearchValue, $options: 'i' } },
        { country: { $regex: freetextSearchValue, $options: 'i' } },
        { city: { $regex: freetextSearchValue, $options: 'i' } },
      ],
    };

    const hotelResults = db.collection<Hotel>('hotels').find(hotelsQuery);

    const cityResults = db
      .collection<City>('cities')
      .find({ name: { $regex: freetextSearchValue, $options: 'i' } });

    const countryResults = db
      .collection<Country>('countries')
      .find({ country: { $regex: freetextSearchValue, $options: 'i' } });

    const response: HotelSearchResponse = {
      hotels: await hotelResults.toArray(),
      cities: await cityResults.toArray(),
      countries: await countryResults.toArray(),
    };

    res.send(response);
  } finally {
    await mongoClient.close();
  }
});

app.get('/hotel/:hotelId', async (req, res) => {
  const { hotelId } = req?.params;
  const mongoClient = await GetMongoClient();

  try {
    const db = mongoClient.db();

    const hotel = db
      .collection('hotels')
      .findOne({ _id: new ObjectId(hotelId) });

    res.send(await hotel);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
});

app.get('/city/:id', async (req, res) => {
  const { id } = req?.params;
  const mongoClient = await GetMongoClient();

  try {
    const db = mongoClient.db();

    const city = db.collection('cities').findOne({ _id: new ObjectId(id) });

    res.send(await city);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
