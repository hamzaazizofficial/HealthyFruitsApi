import express from "express";
import ejs from "ejs";
import mainRouter from "./routes/mainRoute.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(mainRouter);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
