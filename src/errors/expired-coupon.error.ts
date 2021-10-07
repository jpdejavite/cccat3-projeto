class ExpiredCoupon extends Error {
  constructor() {
    super();
    this.message = 'Expired Coupon';
  }
}

export default ExpiredCoupon;
