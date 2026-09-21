import { MongoClient } from "mongodb";
import { MONGODB_URI } from '../env.js'

export const dbClient = new MongoClient(MONGODB_URI);
