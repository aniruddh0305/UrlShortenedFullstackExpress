import crypto from "crypto";
import path from "path";
import {
  getShortenedUrlFromDb,
  saveShortenedUrlIntoDb,
} from "../models/urlShortened.model.js";

export const showUrlShortenerPage = async (req, res) => {
  try {
    console.log("@@@ showUrlShortenerPage contoller");
    const shortenedLinkDbData = await getShortenedUrlFromDb();
    console.log(
      "@@@ showUrlShortenerPage contoller shortenedLinkDbData",
      shortenedLinkDbData,
    );
    return res.render("index", {
      shortenedLinkDbData: shortenedLinkDbData,
      host: req.host,
    });
  } catch (err) {
    console.log("@@@ error in show URL shortener page ", err);
    res.status(500).send("Internal Server error");
  }
};

export const fetchShortenedUrlDbData = async (req, res) => {
  const shortenedUrlDbData = await getShortenedUrlFromDb();
  console.log("@@@ get shortened json url file data", shortenedUrlDbData);
  res.status(200).json(shortenedUrlDbData);
};

export const saveShortenedUrlController = async (req, res) => {
  console.log("@@@ req body post method", req.body);
  const { url, shortCode } = req.body;
  if (url === undefined || url === "") {
    res.status(400).send("Url is required");
  } else {
    const finalShortCode =
      shortCode.replaceAll(" ", "") || crypto.randomBytes(4).toString("hex");
    const shortenedUrlDbData = await getShortenedUrlFromDb();
    console.log(
      "@@@ aleady exisiting short code block before if",
      shortenedUrlDbData,
    );
    const shortcodeAlreadyExists = shortenedUrlDbData.some((shortenedLink) =>
      Object.keys(shortenedLink).includes(finalShortCode),
    );

    if (shortcodeAlreadyExists) {
      console.log("@@@ already existing short code block", finalShortCode);

      return res
        .status(400)
        .send("This shortcode is already used by someone. Please use another");
    } else {
      console.log("@@@ Saving json data in file block");
      saveShortenedUrlIntoDb(finalShortCode, url);
      res.status(200).json({
        success: true,
        shortCode: finalShortCode,
      });
    }
  }
};

export const redirectToShortenedUrlPage = async (req, res, next) => {
  const { shortCode } = req.params;

  console.log("@@@ redirecting route handle shortCode", shortCode);

  const shortenedLinkDbData = await getShortenedUrlFromDb();

  let url;

  for (const shortenedLink of shortenedLinkDbData) {
    if (shortenedLink[shortCode]) {
      url = shortenedLink[shortCode];
      break;
    }
  }

  if (url) {
    console.log("@@@ redirecting to URL", url);
    res.redirect(url);
  } else {
    next();
  }
};

export const renderEjsContent = async (req, res) => {
  const student = {
    name: "Aniruddh",
    class: "12",
    grade: "76",
  };
  res.render("report", { student });
};

export const renderPageNotFoundUI = async (req, res) => {
  res.status(404);
  const pageNotFoundFilePath = path.join(
    import.meta.dirname,
    "../",
    "views",
    "404pageNotFound.html",
  );
  res.sendFile(pageNotFoundFilePath);
};

//export saveShortenedUrlController;
