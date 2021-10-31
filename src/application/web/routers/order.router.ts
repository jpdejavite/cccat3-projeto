import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import PlaceOrder from '../../usecase/place-order';
import DatabaseConnectionAdapter from '../../../infra/database/database-connection-adapter';
import ItemRepositoryDatabase from '../../../infra/repository/database/item-repository-database';
import OrderRepositoryDatabase from '../../../infra/repository/database/order-repository-database';
import PlaceOrderResponse from '../dto/place-order-response';
import PlaceOrderRequest from '../dto/place-order-request';


export const orderRouter = express.Router();

const placeOrderEnpointMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseConnection = new DatabaseConnectionAdapter(process.env.POSTGRES_URL);
    const itemRepository = new ItemRepositoryDatabase(databaseConnection);
    const orderRepository = new OrderRepositoryDatabase(databaseConnection);

    const input: PlaceOrderRequest = req.body;

    const placeOrder = new PlaceOrder(itemRepository, orderRepository);
    const output: PlaceOrderResponse = await placeOrder.execute(input);

    res.status(HttpStatus.CREATED).json(output);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err && err instanceof Error ? err.message : 'unknow error');
  }
};

orderRouter.post('/', placeOrderEnpointMethod as any);
