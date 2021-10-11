import Coupon from '../../../../src/domain/entity/coupon';
import InvalidCoupon from '../../../../src/domain/errors/invalid-coupon.error';

test('Should not create coupon with invalid id', () => {
  expect(() => {
    const coupon = new Coupon('coupon=id');
  }).toThrow(new InvalidCoupon());
});


test('Should validate a valid coupon', () => {
  const coupon = new Coupon('50-discount-coupon-id');
  expect(coupon.isExpired(new Date())).toBeFalsy();
});

test('Should validate a valid coupon', () => {
  const coupon = new Coupon('50-expired-discount-coupon-id');
  expect(coupon.isExpired(new Date())).toBeTruthy();
});
