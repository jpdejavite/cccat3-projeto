import InvalidCoupon from '../errors/invalid-coupon.error';

interface CouponMap {
  [key: string]: number;
}

const validCoupons: CouponMap = {
  '50-discount-coupon-id': 0.50,
};

const CouponValidator = {
  calculateDiscount(coupon: string): number {
    if (!validCoupons[coupon]) {
      throw new InvalidCoupon();
    }

    return validCoupons[coupon];
  },
};

export default CouponValidator;
