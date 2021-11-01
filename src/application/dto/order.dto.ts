export default class OrderDTO {

  constructor(readonly id: number, readonly code: string, readonly cpf: string, readonly shippingCost: number, readonly total: number) {
  }
}
