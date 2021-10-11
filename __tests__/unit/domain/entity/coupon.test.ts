import Coupon from '../../../../src/domain/entity/coupon';

const VALID_COUPON_EXPIRATION_TIME = 10000;

test('Should validate a valid coupon', () => {
  const coupon = new Coupon('50-discount-coupon-id', new Date(Date.now() + VALID_COUPON_EXPIRATION_TIME), 0.50);
  expect(coupon.isExpired(new Date())).toBeFalsy();
});

test('Should validate a valid coupon', () => {
  const coupon = new Coupon('50-expired-discount-coupon-id', new Date(Date.now() - VALID_COUPON_EXPIRATION_TIME), 0.50);
  expect(coupon.isExpired(new Date())).toBeTruthy();
});
