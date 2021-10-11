import Coupon from '../entity/coupon';

export default interface CouponRepository {
  findById(id: string): Promise<Coupon>;
}
