import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
