import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import DatabaseConnectionAdapter from '../../../infra/database/database-connection-adapter';
import DatabaseRepositoryFactory from '../../../infra/factory/database-repository-factory';
import SimulateShippingCosts from '../../usecase/simulate-shipping-costs';
import SimulateShippingCostsRequest from '../dto/simulate-shipping-costs-request';
import SimulateShippingCostsResponse from '../dto/simulate-shipping-costs-response';


export const shippingRouter = express.Router();

const simulateShippingCostsEnpointMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseConnection = new DatabaseConnectionAdapter(process.env.POSTGRES_URL);
    const simulateShippingCosts = new SimulateShippingCosts(new DatabaseRepositoryFactory(databaseConnection));

    const input: SimulateShippingCostsRequest = req.body;
    const output: SimulateShippingCostsResponse = await simulateShippingCosts.execute(input);

    res.status(HttpStatus.OK).json(output);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err && err instanceof Error ? err.message : 'unknow error');
  }
};

shippingRouter.get('/simulate', simulateShippingCostsEnpointMethod as any);
