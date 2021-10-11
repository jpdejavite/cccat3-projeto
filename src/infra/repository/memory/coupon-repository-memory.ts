import Coupon from '../../../domain/entity/coupon';
import InvalidCoupon from '../../../domain/errors/invalid-coupon.error';
import CouponRepository from '../../../domain/repository/coupon-repository';

const VALID_COUPON_EXPIRATION_TIME = 10000;

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon('50-discount-coupon-id', new Date(Date.now() + VALID_COUPON_EXPIRATION_TIME), 0.50),
      new Coupon('50-expired-discount-coupon-id', new Date(Date.now() - VALID_COUPON_EXPIRATION_TIME), 0.50),
    ];
  }

  findById(id: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupons) => coupons.id === id);
    if (!coupon) {
      throw new InvalidCoupon();
    }
    return Promise.resolve(coupon);
  }
}
