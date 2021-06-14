import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import companyRoutes from "./routes/companyRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();
//cors
app.use(cors());

//connect mongo database
connectDB();

//bodyparser init
app.use(express.json());

app.use("/api/companies", companyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
