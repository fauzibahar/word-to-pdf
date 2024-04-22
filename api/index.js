import express from "express";
import ConvertFileRoute from "./routes/ConvertFileRoute.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ConvertFileRoute);

app.get("/", (req, res) => {
  res.json("Welcome To Word to PDF API");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
