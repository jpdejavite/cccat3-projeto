class Coupon {
  public constructor(readonly id: string, readonly expirationDate: Date, readonly discountPercentage: number) {
  }

  public isExpired(today: Date): boolean {
    return this.expirationDate.getTime() < today.getTime();
  }
}

export default Coupon;
