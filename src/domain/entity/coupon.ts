import ExpiredCoupon from '../errors/expired-coupon.error';
import InvalidCoupon from '../errors/invalid-coupon.error';

import CouponData from './coupon-data';

const VALID_COUPON_EXPIRATION_TIME = 10000;

const validCouponDatas: CouponMap = {
  '50-discount-coupon-id': new CouponData(0.50, new Date(Date.now() + VALID_COUPON_EXPIRATION_TIME)),
  '50-expired-discount-coupon-id': new CouponData(0.50, new Date(Date.now() - VALID_COUPON_EXPIRATION_TIME)),
};

interface CouponMap {
  [key: string]: CouponData;
}


class Coupon {
  private static isExpired(expirationDate: Date): boolean {
    return expirationDate.getTime() < new Date().getTime();
  }

  private readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }

  calculateDiscount(): number {
    const couponData = validCouponDatas[this.id];

    if (!couponData) {
      throw new InvalidCoupon();
    }

    if (Coupon.isExpired(couponData.expirationDate)) {
      throw new ExpiredCoupon();
    }

    return couponData.discountAmount;
  }
}

export default Coupon;
