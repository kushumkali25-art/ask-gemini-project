import express from "express";
import dotenv from "dotenv";
import askRoute from "./routes/askRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(askRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});