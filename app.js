import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App listen on PORT ${PORT}`);
});
