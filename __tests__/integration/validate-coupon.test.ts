import ValidateCouponOutput from '../../src/application/dto/output/validate-coupon-output';
import PlaceOrder from '../../src/application/usecase/place-order';
import ValidateCoupon from '../../src/application/usecase/validate-coupon';
import ExpiredCoupon from '../../src/domain/errors/expired-coupon.error';
import InvalidCoupon from '../../src/domain/errors/invalid-coupon.error';
import CouponRepositoryMemory from '../../src/infra/repository/memory/coupon-repository-memory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';

test('Must validate a valid coupon', async () => {
  const input = {
    couponId: '50-discount-coupon-id',
  };
  const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory());
  const output = await validateCoupon.execute(input);
  expect(output.id).toBe('50-discount-coupon-id');
  expect(output.expirationDate).toBeDefined();
  expect(output.discountPercentage).toBe(0.5);
});


test('Must throw error when coupon is not found', async () => {
  const input = {
    couponId: 'not-found-coupon-id',
  };
  const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory());

  await expect(validateCoupon.execute(input)).rejects.toThrow(new InvalidCoupon());
});

test('Must throw error when copoun is expired', async () => {
  const input = {
    couponId: '50-expired-discount-coupon-id',
  };
  const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory());

  await expect(validateCoupon.execute(input)).rejects.toThrow(new ExpiredCoupon());
});
