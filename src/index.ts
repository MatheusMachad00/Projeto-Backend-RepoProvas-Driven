import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import 'express-async-errors';
import router from './routes/index';
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware"


dotenv.config();
const app = express();
app.use(cors(), express.json());
app.use(router);
app.use(errorHandlerMiddleware);


const PORT = Number(process.env.PORT) || 5001;
app.listen(PORT, () => {
  console.log(
    chalk.hex("#00ffff").bold(`Server is up and running on port ${PORT}`)
  );
});