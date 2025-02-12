// import express from "express";
// import mainRouter from "./routes/mainRoute.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.set('view engine', 'ejs');
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(mainRouter);

// app.listen(PORT, () => {
//     console.log(`Server running at ${PORT}`);
// });
import express from "express";
import ejs from "ejs";
import mainRouter from "./routes/mainRoute.js";

import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// app.set('view engine', 'ejs');
// Set 'views' directory for any views 
// being rendered res.render()
// app.set('views', path.join(__dirname, 'views'));

// // Set view engine as EJS
// app.engine('html', ejs.renderFile);
// app.set('view engine', 'ejs');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure correct path

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(mainRouter);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
