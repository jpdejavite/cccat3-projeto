import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import DatabaseConnectionAdapter from '../../../infra/database/database-connection-adapter';
import DatabaseRepositoryFactory from '../../../infra/factory/database-repository-factory';
import ValidateCoupon from '../../usecase/validate-coupon';
import ValidateCouponRequest from '../dto/validate-coupon-request';
import ValidateCouponResponse from '../dto/validate-coupon-response';

export const couponRouter = express.Router();

const validateCouponEnpointMethod = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseConnection = new DatabaseConnectionAdapter(process.env.POSTGRES_URL);
    const validateCoupon = new ValidateCoupon(new DatabaseRepositoryFactory(databaseConnection));

    const input: ValidateCouponRequest = req.body;
    const output: ValidateCouponResponse = await validateCoupon.execute(input);

    res.status(HttpStatus.OK).json(output);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err && err instanceof Error ? err.message : 'unknow error');
  }
};

couponRouter.get('/validate', validateCouponEnpointMethod as any);
