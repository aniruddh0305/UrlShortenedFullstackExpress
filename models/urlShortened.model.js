/*import path from "path";
import fs from "fs/promises";

const __dirname = path.join(import.meta.dirname);
const shortenedUrlJsonFilePath = path.join(
  __dirname,
  "../",
  "data",
  "shortenedUrlLinks.json",
);

export const getShortenedUrlFileData = async () => {
  try {
    const shortenedUrlFileData1 = await fs.readFile(
      shortenedUrlJsonFilePath,
      "utf-8",
    );
    console.log("@@@ shorteneedUrl File data 1", shortenedUrlFileData1);
    if (shortenedUrlFileData1) {
      return JSON.parse(shortenedUrlFileData1);
    }
  } catch (err) {
    console.log("@@@ error while fetchinf the shortened url link file", err);
    if (err.code === "ENOENT") {
      await fs.writeFile(
        path.join(__dirname, "../", "data", "shortenedUrlLinks.json"),
        JSON.stringify({}),
        "utf-8",
      );
      return {};
    }
  }
};

export const saveShortenedUrlInKJsonFile = async (updatedLinkFileData) => {
  try {
    await fs.writeFile(
      shortenedUrlJsonFilePath,
      JSON.stringify(updatedLinkFileData),
      "utf-8",
    );
  } catch (err) {
    console.log("Error while saving the shortened url into json file", err);
  }
};*/

import { dbClient } from "../mongoDb/mongo-drivers.js";
import { MONGODB_DATABASE_NAME } from "../env.js";

const db = dbClient.db(MONGODB_DATABASE_NAME);
const shortenerCollection = db.collection("shortners_Links");

export const getShortenedUrlFromDb = async () => {
  try {
    const shortenedUrlDbData = await shortenerCollection.find().toArray();
    console.log("@@@ shorteneedUrl File data 1", shortenedUrlDbData);
    return shortenedUrlDbData;
  } catch (err) {
    console.log("@@@ error while fetchinf the shortened url link file", err);
    if (err.code === "ENOENT") {
      await fs.writeFile(
        path.join(__dirname, "../", "data", "shortenedUrlLinks.json"),
        JSON.stringify({}),
        "utf-8",
      );
      return {};
    }
  }
};

export const saveShortenedUrlIntoDb = async (finalShortCode, url) => {
  try {
    const AddedShortenerUrlLinkDbRes = await shortenerCollection.insertOne({
      [finalShortCode]: url,
    });
    console.log("@@@ saveShortenedUrlIntoDb response", saveShortenedUrlIntoDb);
  } catch (err) {
    console.log("Error while saving the shortened url into json file", err);
  }
};
