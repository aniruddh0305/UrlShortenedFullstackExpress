import { Router } from "express";
import {
  showUrlShortenerPage,
  fetchShortenedUrlDbData,
  saveShortenedUrlController,
  redirectToShortenedUrlPage,
  renderEjsContent,
  renderPageNotFoundUI,
} from "../controllers/urlShortened.controller.js";
//import { getShortenedUrlFileData } from "../models/urlShortened.model.js";

const router = Router();

console.log('@@@ From routes file')
router.get("/", showUrlShortenerPage);

router.get("/get-shortened-url", fetchShortenedUrlDbData);

router.post("/save-shortenLink", saveShortenedUrlController);

router.get("/report", renderEjsContent);


//keep dynamic routes after static routes 
router.get("/:shortCode", redirectToShortenedUrlPage);

//keep pge not found UI route at last 
router.use(renderPageNotFoundUI);

const shortenedRoutes = router;
export { shortenedRoutes };
