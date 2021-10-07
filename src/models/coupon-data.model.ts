class CouponData {
  public readonly discountAmount: number;
  public readonly expirationDate: Date;


  public constructor(discountAmount: number, expirationDate: Date) {
    this.discountAmount = discountAmount;
    this.expirationDate = expirationDate;
  }
}

export default CouponData;
