import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import router from './routes/index.js';
import { cors } from './middlewares/cors.js';
import { errorLogger, requestLogger } from './middlewares/logger.js';
import rateLimiter from './middlewares/rateLimiter.js';
import centralizedError from './middlewares/centralizedError.js';

dotenv.config();
const { PORT, DBURL } = process.env;

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(DBURL)
  .catch((err) => {
    console.log(`Connection to database was failed with error ${err}`);
  });

app.use(requestLogger);
app.use(rateLimiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(centralizedError);
app.listen(PORT, () => {
  console.log(`App listen on PORT ${PORT}`);
});
