class InvalidCoupon extends Error {
  constructor() {
    super();
    this.message = 'Invalid Coupon';
  }
}

export default InvalidCoupon;
