import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();

app.use(router);
app.listen(PORT, () => {
  console.log(`App listen on PORT ${PORT}`);
});
