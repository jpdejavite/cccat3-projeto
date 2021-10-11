export default class ValidateCouponOutput {

  constructor(readonly id: string, readonly expirationDate: Date, readonly discountPercentage: number) {
  }
}
