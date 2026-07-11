// src/lib/appwrite.js
import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6a4e9dfe0019083f8277");

export const databases = new Databases(client);

export const DATABASE_ID = "6a5172f2000995d1ecda";
export const COLLECTION_ID = "keys";

export default client;