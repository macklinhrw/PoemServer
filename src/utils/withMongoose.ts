import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, { autoIndex: true });

const connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "Database connection error:")
);
connection.once("open", () => {
  console.log("Database connection success!");
});

module.exports = connection;
