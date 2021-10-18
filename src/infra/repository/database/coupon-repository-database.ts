import Coupon from '../../../domain/entity/coupon';
import InvalidCoupon from '../../../domain/errors/invalid-coupon.error';
import CouponRepository from '../../../domain/repository/coupon-repository';
import DatabaseConnection from '../../database/database-connection';

const VALID_COUPON_EXPIRATION_TIME = 10000;

export default class CouponRepositoryDatabase implements CouponRepository {

  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  async findById(id: string): Promise<Coupon> {
    const [couponData] = await this.databaseConnection.query('select * from coupon where code = $1', [id]);

    if (!couponData) {
      throw new InvalidCoupon();
    }

    const coupon = new Coupon(couponData.code, couponData.expiration_date, parseFloat(couponData.discount_percentage));
    return Promise.resolve(coupon);
  }
}
