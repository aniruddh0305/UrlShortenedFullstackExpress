import express, { json, urlencoded } from "express";
import { PORT } from "./env.js";
import { shortenedRoutes } from './routes/urlShortenedRoutes.js';

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //for form data
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));

app.use(shortenedRoutes);

app.set("view engine", "ejs"); // by default it has access to our view folder and access html from there.
// but if we want to access some diffrent html out side view then we set set it.

app.listen(PORT, () => {
  console.log("@@@ URL shortened express app is running on", PORT);
});
