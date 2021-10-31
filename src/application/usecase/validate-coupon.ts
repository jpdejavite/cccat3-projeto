import ExpiredCoupon from '../../domain/errors/expired-coupon.error';
import AbstractRepositoryFactory from '../../domain/factory/abstract-repository-factory';
import CouponRepository from '../../domain/repository/coupon-repository';
import ValidateCouponInput from '../dto/input/validate-coupon-input';
import ValidateCouponOutput from '../dto/output/validate-coupon-output';

export default class ValidateCoupon {
  readonly couponRepository: CouponRepository;

  constructor(abstractRepositoryFactory: AbstractRepositoryFactory) {
    this.couponRepository = abstractRepositoryFactory.createCouponRepository();
  }

  async execute(input: ValidateCouponInput): Promise<ValidateCouponOutput> {
    const coupon = await this.couponRepository.findById(input.couponId);
    if (coupon.isExpired(new Date())) {
      throw new ExpiredCoupon();
    }
    return new ValidateCouponOutput(
      coupon.id,
      coupon.expirationDate,
      coupon.discountPercentage,
    );
  }
}
