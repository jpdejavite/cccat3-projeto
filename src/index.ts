import express from 'express';
import dotenv from 'dotenv';


import { orderRouter } from './application/web/routers/order.router';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/order', orderRouter);

const port = 8080;
// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
