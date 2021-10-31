export default class ValidateCouponResponse {

  constructor(readonly id: string, readonly expirationDate: Date, readonly discountPercentage: number) {
  }
}
