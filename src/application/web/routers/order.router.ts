import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import PlaceOrder from '../../usecase/place-order';
import DatabaseConnectionAdapter from '../../../infra/database/database-connection-adapter';
import PlaceOrderResponse from '../dto/place-order-response';
import PlaceOrderRequest from '../dto/place-order-request';
import DatabaseRepositoryFactory from '../../../infra/factory/database-repository-factory';
import OrderDAODatabase from '../../../infra/dao/order-dao-database';
import GetOrder from '../../query/get-order';
import GetOrderResponse from '../dto/get-order-response';
import GetOrders from '../../query/get-orders';


export const orderRouter = express.Router();

const placeOrderEnpointMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseConnection = new DatabaseConnectionAdapter(process.env.POSTGRES_URL);
    const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));

    const input: PlaceOrderRequest = req.body;
    const output: PlaceOrderResponse = await placeOrder.execute(input);

    res.status(HttpStatus.CREATED).json(output);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err && err instanceof Error ? err.message : 'unknow error');
  }
};

const getOrderEnpointMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseConnection = new DatabaseConnectionAdapter(process.env.POSTGRES_URL);
    const getOrder = new GetOrder(new OrderDAODatabase(databaseConnection));

    const output: GetOrderResponse | null = await getOrder.execute(req.params.orderId);

    res.status(HttpStatus.OK).json(output);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err && err instanceof Error ? err.message : 'unknow error');
  }
};

const getOrdersEnpointMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseConnection = new DatabaseConnectionAdapter(process.env.POSTGRES_URL);
    const getOrders = new GetOrders(new OrderDAODatabase(databaseConnection));

    const output: GetOrderResponse[] = await getOrders.execute();

    res.status(HttpStatus.OK).json(output);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err && err instanceof Error ? err.message : 'unknow error');
  }
};


orderRouter.post('/', placeOrderEnpointMethod as any);
orderRouter.get('/all', getOrdersEnpointMethod as any);
orderRouter.get('/:orderId', getOrderEnpointMethod as any);
