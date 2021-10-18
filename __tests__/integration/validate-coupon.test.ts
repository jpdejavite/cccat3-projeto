import ValidateCoupon from '../../src/application/usecase/validate-coupon';
import ExpiredCoupon from '../../src/domain/errors/expired-coupon.error';
import InvalidCoupon from '../../src/domain/errors/invalid-coupon.error';
import CouponRepository from '../../src/domain/repository/coupon-repository';
import DatabaseConnection from '../../src/infra/database/database-connection';
import DatabaseConnectionAdapter from '../../src/infra/database/database-connection-adapter';
import CouponRepositoryDatabase from '../../src/infra/repository/database/coupon-repository-database';

import constants from './constants';

let couponRepository: CouponRepository;
let databaseConnection: DatabaseConnection;


beforeAll(() => {
  databaseConnection = new DatabaseConnectionAdapter(constants.POSTGRES_URL);
  couponRepository = new CouponRepositoryDatabase(databaseConnection);
});

afterAll(async () => {
  await databaseConnection.close();
});

test('Must validate a valid coupon', async () => {
  const input = {
    couponId: '50-discount-coupon-id',
  };
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = await validateCoupon.execute(input);
  expect(output.id).toBe('50-discount-coupon-id');
  expect(output.expirationDate).toBeDefined();
  expect(output.discountPercentage).toBe(0.5);
});


test('Must throw error when coupon is not found', async () => {
  const input = {
    couponId: 'not-found-coupon-id',
  };
  const validateCoupon = new ValidateCoupon(couponRepository);

  await expect(validateCoupon.execute(input)).rejects.toThrow(new InvalidCoupon());
});

test('Must throw error when copoun is expired', async () => {
  const input = {
    couponId: '50-expired-discount-coupon-id',
  };
  const validateCoupon = new ValidateCoupon(couponRepository);

  await expect(validateCoupon.execute(input)).rejects.toThrow(new ExpiredCoupon());
});
