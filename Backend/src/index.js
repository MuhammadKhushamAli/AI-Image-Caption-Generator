import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import app from "./app.js";
import { client } from "./redis";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    client.connect();
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is Running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
