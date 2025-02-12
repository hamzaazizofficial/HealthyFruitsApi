import express from "express";
import mainRouter from "./routes/mainRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(mainRouter);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
