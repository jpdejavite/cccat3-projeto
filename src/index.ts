import express from 'express';
import dotenv from 'dotenv';


import { orderRouter } from './application/web/routers/order.router';
import { shippingRouter } from './application/web/routers/shipping.router';
import { couponRouter } from './application/web/routers/coupon.router';
import Logger from './application/logger/logger';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/coupon', couponRouter);
app.use('/order', orderRouter);
app.use('/shipping', shippingRouter);

const port = 8080;
app.listen(port, () => {
  const logger = Logger.get();
  logger.info(`server started at http://localhost:${port}`);
});
