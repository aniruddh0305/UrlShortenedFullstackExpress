import express, { json, urlencoded } from "express";
import { PORT } from "./env.js";
import path from "path";
import fs from "fs/promises";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //for form data
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));

const __dirname = path.join(import.meta.dirname);
const shortenedUrlJsonFilePath = path.join(
  __dirname,
  "data",
  "shortenedUrlLinks.json",
);
app.get("/", (req, res) => {
  const indexHtmlFilePath = path.join(__dirname, "public", "index.html");
  res.status(200).sendFile(indexHtmlFilePath);
});

app.get("/get-shortened-url", async (req, res) => {
  const shortenedUrlFileData = await getShortenedUrlFileData();
  console.log("@@@ get shortened json url file data", shortenedUrlFileData);
  //res.status(200).send(JSON.stringify(shortenedUrlFileData));
  res.status(200).json(shortenedUrlFileData);
});

app.post("/save-shortenLink", async (req, res) => {
  console.log("@@@ req body post method", req.body);
  const { url, shortCode } = req.body;
  if (url === undefined || url === "") {
    res.status(400).send("Url is required");
  } else {
    const finalShortCode =
      shortCode.replaceAll(" ", "") || crypto.randomBytes(4).toString("hex");
    const shortenedUrlFileData2 = await getShortenedUrlFileData();
    console.log(
      "@@@ aleady exisiting short code block before if",
      shortenedUrlFileData2,
    );
    if (shortenedUrlFileData2[finalShortCode]) {
      console.log("@@@ aleady exisiting short code block", finalShortCode);
      res
        .status(400)
        .send("This shortcode ia already used by someone please use another");
    } else {
      console.log("@@@ Saving json data in file block");
      const updatedLinkFileData = shortenedUrlFileData2;
      updatedLinkFileData[finalShortCode] = url;
      saveShortenedUrlInKJsonFile(updatedLinkFileData);
      /*res.status(200).send(
        JSON.stringify({
          success: true,
          shortCode: finalShortCode,
        }),
      );*/

      res.status(200).json({
        success: true,
        shortCode: finalShortCode,
      });
    }
  }
});

app.get("/:shortCode", async (req, res,next) => {
  const { shortCode } = req.params;

  console.log("@@@ redirecting route handle shortCode", shortCode);
  const shortenedLinkFileData3 = await getShortenedUrlFileData();
  if (shortenedLinkFileData3[shortCode]) {
    const url = shortenedLinkFileData3[shortCode];
    res.status(200).redirect(url);
  } else {
    next();
    //res.status(400).send(`No url present for this shortcode ${shortCode}`);
  }
});
const getShortenedUrlFileData = async () => {
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
        path.join(__dirname, "data", "shortenedUrlLinks.json"),
        JSON.stringify({}),
        "utf-8",
      );
      return {};
    }
  }
};

const saveShortenedUrlInKJsonFile = async (updatedLinkFileData) => {
  try {
    await fs.writeFile(
      shortenedUrlJsonFilePath,
      JSON.stringify(updatedLinkFileData),
      "utf-8",
    );
  } catch (err) {
    console.log("Error while saving the shortened url into json file", err);
  }
};

app.use((req, res) => {
  res.status(404);
  const pageNotFoundFilePath = path.join(
    import.meta.dirname,
    "public",
    "404pageNotFound.html",
  );
  res.sendFile(pageNotFoundFilePath);
});

app.listen(PORT, () => {
  console.log("@@@ URL shortened express app is running on", PORT);
});
